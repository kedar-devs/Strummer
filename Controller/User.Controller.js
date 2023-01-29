const { ObjectId } = require("mongodb")
const UserData = require("../Models/User.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Creator = require("../Models/Coach.model")
const Vonage = require('@vonage/server-sdk')
const otpGenerator = require('otp-generator')
const nodemailer=require('nodemailer')
const cloudinary = require('cloudinary').v2
const streamifier=require('./../Helper/Streamifier')
require('./../Helper/Cloudinary')
const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'strummerforlife@gmail.com',
        pass: 'tnkjxsyzbdtzomwf'
    }
})

exports.RegisterUser = async (req, res) => {
    try{
        console.log(req.files)
    const User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        courses: [],
        contact: req.body.contact,
        otp: 12234,
        ProfilePic: req.files.Pp,
        isCoach: false,
        CoachId: new ObjectId(),
        accessToken: ' ',
        refreshToken: ' ',
        resetToken: ' '
    }
    try{
    User.ProfilePic=await streamifier.UploadImage(req.files.Pp)  
    User.ProfilePic=User.ProfilePic.url
    //User.ProfilePic="http://res.cloudinary.com/dwxxqd2zu/image/upload/v1668406330/kh3jt9quputhrv95u14k.jpg"
    }catch(err){
        console.log('The Error being:',err)
    }
    const FoundUser = await UserData.findOne({ email: User.email })
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
            console.log(err)
            return res.status(400).send({ err })
        }
        return res.status(200).send({ token: user.accessToken })
    })
    }catch(err){
        console.log(err)
        return res.status(400).send({ err })
    }

}
exports.LoginUser = async (req, res) => {
    try{
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
    }catch(err){
        console.log(err)
        return res.status(400).send({ err })
    }
}
exports.RegisterUserMobile = async (req, res) => {
    try{
    const { contact } = req.body
    console.log(contact)
    const Otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const from = "Strummer"
    const to = 919763346848
    const text = `Your One-Time-Password is ${Otp}.We welcome you to our platform Hope you enjoy it`
    vonage.message.sendSms(from, to, text, async(err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                const FoundUser =await UserData.findOne({contact})
                console.log(FoundUser)
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
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}
exports.LoginUserMobile = async (req, res) => {
    try{
    const { contact, otp,accessToken } = req.body
    
    const FoundUser = await UserData.findOne({accessToken:accessToken,otp:otp})
    console.log(FoundUser)
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
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}

exports.BecomeCreator = async (req, res) => {
    try{
    const FoundUser = await UserData.findOne({ accessToken: req.body.accessToken })
    console.log(FoundUser,req.body.accessToken)
    const Coach = {
        creatorName: req.body.name ? req.body.name : FoundUser.name,
        followers: 0,
        earned: 0.0,
        email: req.body.email?req.body.email:FoundUser.email,
        parentId:FoundUser._id,
        password: req.body.password ? await bcrypt.hashSync(req.body.password,10) : FoundUser.password,
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
                let id=NewCoach._id
                return res.status(200).send({id})
            })

        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}
exports.EditProfile = async (req, res) => {
    try{
    const { name, ProfilePic } = req.body
    const FoundUser = UserData.findOne({ accessToken: req.body.accessToken })
    if (FoundUser) {
        FoundUser.name = name ? name : FoundUser.name
        // FoundUser.ProfilePic = ProfilePic ? ProfilePic : FoundUser.ProfilePic
        if(ProfilePic!=null || ProfilePic!=undefined){
            FoundUser.ProfilePic= User.ProfilePic=cloudinary.url(FoundUser.ProfilePic, {width: 100, height: 150, crop: "fill", fetch_format: "auto"})
        }
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
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}
exports.SendOTP = async (req, res) => {
    try{
    console.log(req.body)
    const { contact } = req.body
    const FoundUser = await UserData.findOne({ contact })
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
    }catch(err){
        console.log(err)
        return res.status(400).send({ err })
    }
}

exports.EditContact = async (req, res) => {
    try{
    const { oldContact, newContact, otp, accessToken } = req.body
    const FoundUser = await UserData.findOne({accessToken}).where("otp").equals(otp)
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
}catch(err){
    
    console.log(err)
    return res.status(400).send({ err })
}

}
exports.generateResetLink = async (req, res) => {
    const { email } = req.body
    try{
        console.log(req.body)
    const FoundUser = await UserData.findOne({ email })
    if(!FoundUser){
        return res.status(404).send({message:'No user Find'})
    }
    let payload = { subject: new ObjectId() }
    let token = await jwt.sign(payload, process.env.SECRET_KEY_COACH)
    FoundUser.resetToken = token
    FoundUser.save((err, user) => {
        if (err) {
            return res.status(400).send({ err })
        }
        else {
            transporter.sendMail({
                to: email,
                from: "strummerforlife@gmail.com",
                subject: "Email Password Reset",
                html: `
                <p>Hi ${user.name}, forgot your password.<br/> Don't worry we got you covered</p>
                <h5><a href="https://drab-red-bandicoot-vest.cyclic.app/GenerateResetPassword/${token}">click here</a></h5>
                <p>link expires in one hour, thank you</p>
                `

            }, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.send(err)
                }
                else {
                    console.log(result)
                    return res.status(200).send({
                        message: 'An email has been sent to the provided email with further instructions.'
                    })
                }
                transporter.close()
            }
            )

        }
    })
}catch(err){
    console.log(err)

    return res.send(err)
}

}
exports.ResetPassword=async(req,res)=>{
    try{
        console.log('in here',req.body)
    const {password,resetToken}=req.body
    const FoundUser=await UserData.findOne({resetToken})
    console.log(FoundUser)
    if(FoundUser){
        FoundUser.password=await bcrypt.hashSync(password,10)
        FoundUser.save((err, user) => {
            if (err) {
                console.log(err)
                return res.status(400).send({ err })
            }
            else {
                console.log('in here')
                return res.status(200).send({ message: 'Password successfully Updated' })
            }
        })
    }
    else{
        return res.status(401).send({ message: 'No user was found' })
    }
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}
exports.getAlluser=async(req,res)=>{
    try{
    const AllUser=await UserData.find()
    if(AllUser){
        return res.status(200).send(AllUser)
    }
    else{
        return res.status(400).send({message:'No User found'})
    }
}catch(err){
    console.log(err)
    return res.status(400).send({ err })
}
}
exports.getOneUser=async(req,res)=>{
    try{
    const accessToken=req.params.token
    const FoundUser=await UserData.findOne({accessToken})
    if(FoundUser){
        return res.status(200).send(FoundUser)
    }
    else{
        return res.status(404).send({message:'No User Found'})
    }
}catch(err){
    console.log(err)
}
}
exports.getUserId=async(req,res)=>{
    try{
        const accessToken=req.params.token
        const FoundUser=await UserData.findOne({accessToken})
        if(FoundUser){
            return res.status(200).send(FoundUser._id)
        }
        else{
            return res.status(404).send({message:'No User Found'}) 
        }
    }catch(err){
        return res.status(400).send({message:err})
    }
}
exports.getUserImage=async(req,res)=>{
    try{
        const accessToken=req.params.token
        const FoundUser=await UserData.findOne({accessToken})
        if(FoundUser){
            return res.status(200).send(FoundUser.ProfilePic)
        }
        else{
            return res.status(400).send({message:'No User Found'})
        }
    }catch(err){
        return res.status(400).send({err})
    }
}
