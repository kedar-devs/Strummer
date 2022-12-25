const Creator = require("../Models/Coach.model")
const UserData = require("../Models/User.model")

exports.changeName=async(req,res)=>{
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
}
exports.getAllCreator=async(req,res)=>{
    const AllCreators=await Creator.find()
    if(AllCreators){
        return res.status(200).send(AllCreators)
    }
    else{
        return res.status(404).send({message:'User Not found'})
    }
}

exports.GetOneCreator=async(req,res)=>{
    const {accessToken}=req.params.token
    const GetOneCreator=await Creator.findOne({accessToken})
    if(GetOneCreator){
        return res.status(200).send(GetOneCreator)
    }
    else{
        return res.status(400).send({message:'No user found'})
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