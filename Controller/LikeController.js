const Likes = require("../Models/VideoRelatedStuff/LikeCountModel")
const ContentData = require("../Models/content.model");

exports.AddLikes=async(req,res)=>{
    try{
        const {ContentId,userId}=req.body
        const Like={
            ContentId:ContentId,
            userId:userId,
            DateTime:new Date()
        }
        const newLike=new Likes(Like)
        newLike.save((err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send({message:err})
            }
            return res.status(200).send(result)
        }) 
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}
exports.checkLike=async(req,res)=>{
    try{
        const {contentId,userId}=req.body
        const FoundLike=await Likes.findOne({ContentId:contentId,userId:userId})
        if(FoundLike){
            return res.status(200).send(true)
        }
        else{
            return res.status(400).send(false)
        }
    }catch(err){
        return res.status(400).send(false)
    }
}
exports.getLikedVideo=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundUser=await Likes.find({userId:id})
        result=[]
        let FoundVideo
        if(FoundUser){
            for(let i=0;i<FoundUser.length;i++){
                FoundVideo=await ContentData.findOne({_id:FoundUser[i].ContentId})
                if(FoundVideo){
                    result.push(FoundVideo)
                }
            }
            result.reverse()
            return res.status(200).send({result})
        }
        else{
            return res.status(400).send({message:'No user Found'})
        }
        }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}
exports.deleteLikes=async(req,res)=>{
    try{
        console.log(req.body)
    const {ContentId,userId}=req.body
    const FoundLike=await Likes.findOneAndDelete({ContentId,userId})
    if(FoundLike){
        return res.status(200).send({message:'Delete successfully'})
    }
    return res.status(400).send({message:'No user Found'})
    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}