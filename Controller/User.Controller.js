const { ObjectId } = require("mongodb")
const UserData = require("../Models/User.model")
const jwt=require('json-web-token')
const bcrypt=require('bcryptjs')
const Creator = require("../Models/Coach.model")

exports.RegisterUser=async(req,res)=>{
    const User={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        contact:req.body.contact,
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

