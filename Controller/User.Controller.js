const { ObjectId } = require("mongodb")
const UserData = require("../Models/User.model")
const jwt=require('json-web-token')
const bcrypt=require('bcryptjs')

exports.RegisterUser=async(req,res)=>{
    const User={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        contact:req.body.contact,
        ProfilePic:req.body.Pp,
        isCoach:false,
        coachId:new ObjectId(),
        accessToken:' ',
        refreshToken:' '
    }
    const FoundUser=await User.findOne({email:User.email})
    if(FoundUser){
        return res.status(401).send({message:'A user with this email ID already exist'})
    }

    const NewUser=await new UserData({User})
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
}
exports.BecomeCreator=async(req,res)=>{ 
}