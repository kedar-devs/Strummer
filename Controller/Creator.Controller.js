const Creator = require("../Models/Coach.model")

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
    const {accessToken}=req.body
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
}

exports.decreaseFollowers=async(req,res)=>{
    const {accessToken}=req.body
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
