const DisLike=require('./../Models/VideoRelatedStuff/DislikeCount.model')
const ContentData = require("../Models/content.model");

exports.AddDisLikes=async(req,res)=>{
    try{
        const {ContentId,userId}=req.body
        const Like={
            ContentId:ContentId,
            userId:userId,
            DisLikeStatus:true,
            DateTime:new Date()
        }
        const FoundDisLike=await DisLike.findOne({ContentId:ContentId,userId:userId,DisLikeStatus:true})
        if(FoundDisLike){
            console.log(FoundDisLike)
            return res.status(400).send({message:'Already Liked'})
        }
        else{
        const newLike=new DisLike(Like)
        newLike.save((err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).send({message:err})
            }
            return res.status(200).send(result)
        }) 
    }
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}
exports.checkDisLike=async(req,res)=>{
    try{
        const {contentId,userId}=req.body
        const FoundDisLike=await DisLike.findOne({ContentId:contentId,userId:userId,DisLikeStatus:true})
        if(FoundDisLike){
            return res.status(200).send(true)
        }
        else{
            return res.status(400).send(false)
        }
    }catch(err){
        return res.status(400).send(false)
    }
}
exports.getDisLikedVideo=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundUser=await DisLike.find({userId:id,DisLikeStatus:true})
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
exports.deleteDisLikes=async(req,res)=>{
    try{
        console.log(req.body)
    const {ContentId,userId}=req.body
    const FoundDisLike=await DisLike.findOne({ContentId,userId})
    if(FoundDisLike){
        FoundDisLike.DisLikeStatus=false
        FoundDisLike.save()
        .then(result=>{
            return res.status(200).send({message:'Delete successfully'})
        })
        .catch(err=>{
            return res.status(400).send({message:'No user Found'})
        })
     
    }
    else{
    return res.status(400).send({message:'No user Found'})
    }
    }catch(err){
        console.log(err)
        return res.status(400).send({message:err})
    }
}
exports.getDislikeCount=async(ContentId)=>{
    try{
    const FoundDislike=await DisLike.find({ContentId,DisLikeStatus:true})
    if(FoundDislike){
    return FoundDislike.length()
    }
    else{
        return 0
    }
    }catch(err){
        return 0
    }
}