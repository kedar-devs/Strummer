const { ObjectId } = require("mongodb")
const UserData = require("../Models/User.model")
const jwt = require('json-web-token')
const bcrypt = require('bcryptjs')
const Creator = require("../Models/Coach.model")
const Vonage = require('@vonage/server-sdk')
const otpGenerator = require('otp-generator')
const vonage = new Vonage({
    apiKey: "",
    apiSecret: ""
})

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'StrummerForLife@gmail.com',
        pass: 'Strummer*123'
    }
})

exports.RegisterUser = async (req, res) => {
    const User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        courses: [],
        contact: req.body.contact,
        otp: 12234,
        ProfilePic: req.body.Pp,
        isCoach: false,
        CoachId: new ObjectId(),
        accessToken: ' ',
        refreshToken: ' ',
        resetToken: ' '
    }
    const FoundUser = await User.findOne({ email: User.email })
    if (FoundUser) {
        return res.status(401).send({ message: 'A user with this email ID already exist' })
    }

    const NewUser = await new UserData(User)
    const hash = await bcrypt.hashSync(NewUser.password, 10)
    if (!hash) {
        return res.status(401).message({ message: 'Error occured when encrypting the password' })
    }
    NewUser.password = hash
    let payload = { subject: new ObjectId() }
    let token = jwt.sign(payload, process.env.SECRET_KEY)
    NewUser.accessToken = token
    payload = { subject: NewUser.email }
    token = jwt.sign(payload, process.env.SECRET_KEY)
    NewUser.refreshToken = token
    NewUser.save((err, user) => {
        if (err) {
            return res.status(500).send({ err })
        }


        return res.status(200).send({ token: user.accessToken })
    })


}
exports.LoginUser = async (req, res) => {
    const { email, password } = req.body
    const FoundUser = await UserData.findOne({ email })
    if (FoundUser) {
        let PasswordResult = bcrypt.compareSync(password, FoundUser.password)
        console.log(PasswordResult)
        if (PasswordResult) {
            let payload = { subject: new ObjectId() }
            let token = await jwt.sign(payload, process.env.SECRET_KEY)
            FoundUser.accessToken = token
            FoundUser.save((err, user) => {
                if (err) {
                    return res.status(401).send({ err })
                }
                else {
                    return res.status(200).send({ token })
                }
            })
        }

    }
    else {
        return res.status(404).send({ message: 'User not found' })
    }
}
exports.RegisterUserMobile = async (req, res) => {
    const { contact, accessToken } = req.body
    const Otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const from = "Strummer"
    const to = contact
    const text = `Your One-Time-Password is ${Otp}
                    We welcome you to our platform 
                    Hope you enjoy it`
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                const FoundUser = UserData.findOne({ accessToken })
                FoundUser.otp = Otp
                FoundUser.save((err, user) => {
                    if (err) {
                        return res.status(400).send({ err })
                    }
                    else {
                        return res.status(200).send({ message: "Message sent successfully." })
                    }
                })

            } else {
                return res.status(400).send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}
exports.LoginUserMobile = async (req, res) => {
    const { contact, otp } = req.body
    const FoundUser = await UserData.find()
        .Where("contact")
        .equals(contact)
        .Where("otp")
        .equals(otp)
    let payload = { subject: new ObjectId() }
    let token = await jwt.sign(payload, process.env.SECRET_KEY)
    FoundUser.accessToken = token
    FoundUser.save((err, user) => {
        if (err) {
            return res.status(400).send({ err })
        }
        else {
            return res.status(200).send({ token })
        }
    })
}

exports.BecomeCreator = async (req, res) => {
    const FoundUser = await UserData.findOne({ accessToken: req.body.accessToken })
    const Coach = {
        creatorName: req.body.name ? req.body.name : FoundUser.name,
        followers: 0,
        earned: 0.0,
        email: FoundUser.email,
        password: req.body.password ? req.body.password : FoundUser.password,
        channel: [],
        accessToken: ' '
    }
    let payload = { subject: new ObjectId() }
    let token = await jwt.sign(payload, process.env.SECRET_KEY_COACH)
    Coach.accessToken = token
    const NewCoach = await Creator(Coach)
    NewCoach.save((err, coach) => {
        if (err) {
            return res.status(400).send({ err })
        }
        else {
            FoundUser.isCoach = true
            FoundUser.CoachID = coach._id
            FoundUser.save((err, user) => {
                if (err) {
                    return res.status(400).send({ err })
                }
                return res.status(200).send({ token })
            })

        }
    })
}
exports.EditProfile = async (req, res) => {
    const { name, ProfilePic } = req.body
    const FoundUser = UserData.findOne({ accessToken: req.body.accessToken })
    if (FoundUser) {
        FoundUser.name = name ? name : FoundUser.name
        FoundUser.ProfilePic = ProfilePic ? ProfilePic : FoundUser.ProfilePic
        FoundUser.save((err, user) => {
            if (err) {
                return res.status(400).send({ err })
            }
            else {
                return res.status(200).send({ message: 'User Details Updated Succesfully' })
            }
        })
    }
    else {
        return res.status(401).send({ message: 'No user was found' })
    }
}
exports.SendOTP = async (req, res) => {
    const { contact, accessToken } = req.body
    const FoundUser = await UserData.findOne({ accessToken })
    if (FoundUser) {
        const Otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        const from = "Strummer"
        const to = contact
        const text = `Your One-Time-Password is ${Otp}
                   This is available for a duration of 5 min`
        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    FoundUser.otp = Otp
                    FoundUser.save((err, user) => {
                        if (err) {
                            return res.status(400).send({ err })
                        }
                        else {
                            return res.status(200).send({ message: 'OTP send successfully' })
                        }
                    })

                }
            }
        })

    }
    else {
        return res.status(401).send({ message: 'No user was found' })
    }
}

exports.EditContact = async (req, res) => {
    const { oldContact, newContact, otp, accessToken } = req.body
    const FoundUser = await UserData.findOne().Where("contact").equals(oldContact).where("otp").equals(otp)
    if (FoundUser) {
        FoundUser.contact = newContact
        let payload = { subject: new ObjectId() }
        let token = await jwt.sign(payload, process.env.SECRET_KEY_COACH)
        FoundUser.accessToken = token
        FoundUser.save((err, user) => {
            if (err) {
                return res.status(400).send({ err })
            }
            else {
                return res.status(200).send({ message: 'OTP send successfully' })
            }
        })
    }
    else {
        return res.status(401).send({ message: 'No user was found' })
    }

}
exports.generateResetLink = async (req, res) => {
    const { email } = req.body
    const FoundUser = await UserData.findOne({ email })
    let payload = { subject: new ObjectId() }
    let token = await jwt.sign(payload, process.env.SECRET_KEY_COACH)
    FoundUser.resetToken = token
    FoundUser.save((err, user) => {
        if (err) {
            return res.status(400).send({ err })
        }
        else {
            transporter.sendMail({
                to: FoundUser.email,
                rom: "StrummerForLife@gmail.com",
                subject: "Email Password Reset",
                html: `
                <p>Hi ${user.firstname}, forgot your password.<br/> Don't worry we got you covered</p>
                <h5><a href="https://savishkar-webapp.herokuapp.com/update-password/${token}">click here</a></h5>
                <p>link expires in one hour, thank you</p>
                `

            }, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    return res.status(200).send({
                        message: 'An email has been sent to the provided email with further instructions.'
                    })
                }
                transporter.close()
            }
            )

        }
    })

}
exports.ResetPassword=async(req,res)=>{
    const {resetToken,password}=req.body
    const FoundUser=await UserData.findOne({resetToken})
    if(FoundUser){
        FoundUser.password=password
        FoundUser.save((err, user) => {
            if (err) {
                return res.status(400).send({ err })
            }
            else {
                return res.status(200).send({ message: 'Password successfully Updated' })
            }
        })
    }
    else{
        return res.status(401).send({ message: 'No user was found' })
    }
}

