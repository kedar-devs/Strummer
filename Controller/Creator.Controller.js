const Creator = require("../Models/Coach.model")
const UserData = require("../Models/User.model")
const bcrypt = require('bcryptjs')

exports.changeName=async(req,res)=>{
    try{
    const {accessToken,newName}=req.body
    const FoundCoach=await Creator.findOne({accessToken})
    FoundCoach.creatorName=newName
    FoundCoach.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:`Creator name changed ${user.creatorName}`})
        }
    })
}catch(err){
    console.log(err)
}
}
exports.increaseFollowers=async(req,res)=>{
    const {accessToken}=req.params
    try{
    const FoundCoach=await Creator.findOne({accessToken})
    FoundCoach.followers+=1
    FoundCoach.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:`Follower has increased to ${user.followers}`})
        }
    })
}catch(err){
    return res.status(400).send(err)
}
}

exports.decreaseFollowers=async(req,res)=>{
    const {accessToken}=req.params
    try{
    const FoundCoach=await Creator.findOne({accessToken})
    FoundCoach.followers-=1
    FoundCoach.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:`Follower has descreased to ${user.followers}`})
        }
    })
}catch(err){
    return res.status(400).send(err)
}
}
exports.AddChannel=async(req,res)=>{
    try{
    const {accessToken,_id}=req.body
    const FoundCoach=await Creator.findOne({accessToken})
    FoundCoach.channel.push(_id)
    FoundCoach.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:`Channel Added Successfully`})
        }
 
    })
}catch(err){
    console.log(err)
}
}
exports.getAllCreator=async(req,res)=>{
    try{
    const AllCreators=await Creator.find()
    if(AllCreators){
        return res.status(200).send(AllCreators)
    }
    else{
        return res.status(404).send({message:'User Not found'})
    }
}catch(err){
    console.log(err)
}
}

exports.GetOneCreator=async(req,res)=>{
    try{
    const {accessToken}=req.params.token
    const GetOneCreator=await Creator.findOne({accessToken})
    if(GetOneCreator){
        return res.status(200).send(GetOneCreator)
    }
    else{
        return res.status(400).send({message:'No user found'})
    }
}catch(err){
    console.log(err)
}
}
exports.getFromParent=async(req,res)=>{
    
    try{
    const {accessToken}=req.params
    
    const FoundUser=await UserData.findOne({accessToken})
    if(FoundUser){
    const FoundCreator=await Creator.find({parentId:FoundUser._id})
    if(FoundCreator){
        return res.status(200).send({FoundCreator,isFound:true})
    }
    else{
        return res.status(400).send({isFound:false})
    }
}
else{
    return res.status(400).send({isFound:false})
}
}catch(err){
    console.log(err)
    return res.status(400).send({err})   
}
}
exports.loginCreator=async(req,res)=>{
    try{
    const {email,password}=req.body
    const FoundCreator=await Creator.findOne({email})
    if(FoundCreator){
        let PasswordResult=bcrypt.compareSync(password,FoundCreator.password)
        if (PasswordResult){
            let payload = { subject: new ObjectId() }
            let token = await jwt.sign(payload, process.env.SECRET_KEY)
            FoundCreator.accessToken=token
            FoundCreator.save((err,user)=>{
                if(err){
                    return res.status(401).send({ err })
                }
                else{
                    let id=user._id
                    return res.status(200).send({id})
                }
            })
        }
    }
}catch(err){
    return res.status(401).send({ err })
}
}