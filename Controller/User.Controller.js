const { ObjectId } = require("mongodb")
const UserData = require("../Models/User.model")
const jwt=require('json-web-token')
const bcrypt=require('bcryptjs')
const Creator = require("../Models/Coach.model")
const Vonage = require('@vonage/server-sdk')
const otpGenerator = require('otp-generator')
const vonage = new Vonage({
  apiKey:"",
  apiSecret:""
})

exports.RegisterUser=async(req,res)=>{
    const User={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        contact:req.body.contact,
        otp:12234,
        ProfilePic:req.body.Pp,
        isCoach:false,
        CoachId:new ObjectId(),
        accessToken:' ',
        refreshToken:' '
    }
    const FoundUser=await User.findOne({email:User.email})
    if(FoundUser){
        return res.status(401).send({message:'A user with this email ID already exist'})
    }

    const NewUser=await new UserData(User)
    const hash=await bcrypt.hashSync(NewUser.password,10)
    if(!hash){
        return res.status(401).message({message:'Error occured when encrypting the password'})
    }
    NewUser.password=hash
    let payload={subject:new ObjectId()}
    let token=jwt.sign(payload,process.env.SECRET_KEY)
    NewUser.accessToken=token
     payload={subject:NewUser.email}
     token=jwt.sign(payload,process.env.SECRET_KEY)
     NewUser.refreshToken=token
    NewUser.save((err,user)=>{
        if(err){
            return res.status(500).send({err})
        }
        
        
        return res.status(200).send({token:user.accessToken})
    })


}
exports.LoginUser=async(req,res)=>{
    const {email,password}=req.body
    const FoundUser=await UserData.findOne({email})
    if(FoundUser){
        let PasswordResult=bcrypt.compareSync(password,FoundUser.password)
        console.log(PasswordResult)
        if(PasswordResult){
            let payload={subject:new ObjectId()}
            let token=await jwt.sign(payload,process.env.SECRET_KEY)
            FoundUser.accessToken=token
            FoundUser.save((err,user)=>{
                if(err){
                    return res.status(401).send({err})
                }
                else{
                    return res.status(200).send({token})
                }
            })
        }

    }
    else{
        return res.status(404).send({message:'User not found'})
    }
}
exports.RegisterUserMobile=async(req,res)=>{
    const {contact,accessToken}=req.body
    const Otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const from = "Strummer"
    const to = contact
    const text = `Your One-Time-Password is ${Otp}
                    We welcome you to our platform 
                    Hope you enjoy it`
    vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
   if(responseData.messages[0]['status'] === "0") {
      const FoundUser=UserData.findOne({accessToken})
      FoundUser.otp=Otp
      FoundUser.save((err,user)=>{
        if(err){
            return res.status(400).send({err})
        }
        else{
            return res.status(200).send({message:"Message sent successfully."})
        }
      })

    } else {
   return res.status(400).send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
   }
  }
 })
}
exports.LoginUserMobile=async(req,res)=>{
    const {contact,otp}=req.body
    const FoundUser=await UserData.find()
    .Where("contact")
    .equals(contact)
    .Where("otp")
    .equals(otp)
    let payload={subject:new ObjectId()}
    let token=await jwt.sign(payload,process.env.SECRET_KEY)
    FoundUser.accessToken=token
    FoundUser.save((err,user)=>{
        if(err){
            return res.status(400).send({err})
        }
        else{
            return res.status(200).send({token})
        }
    })
}

exports.BecomeCreator=async(req,res)=>{ 
    const FoundUser=await UserData.findOne({accessToken:req.body.accessToken})
    const Coach={
        creatorName:req.body.name?req.body.name:FoundUser.name,
        followers:0,
        earned:0.0,
        email:FoundUser.email,
        password:req.body.password?req.body.password:FoundUser.password,
        channel:[],
        accessToken:' '
    }
    let payload={subject:new ObjectId()}
    let token=await jwt.sign(payload,process.env.SECRET_KEY_COACH)
    Coach.accessToken=token
    const NewCoach=await Creator(Coach)
    NewCoach.save((err,coach)=>{
        if(err){
            return res.status(400).send({err})
        }
        else{
            FoundUser.isCoach=true
            FoundUser.CoachID=coach._id
            FoundUser.save((err,user)=>{
                if(err){
                    return res.status(400).send({err})
                }
                return res.status(200).send({token})
            })
        
        }
    })  
}
exports.EditProfile=async(req,res)=>{
    const {name,ProfilePic}=req.body
    const FoundUser=UserData.findOne({accessToken:req.body.accessToken})
    FoundUser.name=name?name:FoundUser.name
    FoundUser.ProfilePic=ProfilePic?ProfilePic:FoundUser.ProfilePic
    FoundUser.save((err,user)=>{
        if(err){
            return res.status(400).send({err})
        }
        else{
            return res.status(200).send({message:'User Details Updated Succesfully'})
        }
    })
}



