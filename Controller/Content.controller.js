const ContentData = require("../Models/content.model");
const cloudinary = require('cloudinary').v2
require('./../Helper/Cloudinary')

exports.CreateNewContent=async(req,res)=>{
    const {ContentCreator,length,channelId}=req.body
    const videoFile=req.files.video
    cloudinary.uploader.upload_large(videoFile.tempFilePath, {
        chunk_size: 7000000
      },async (error, result) => {
        if(error){
            return res.status(400).send({error})
        }
        else{
            console.log(result)
            const ContentUrl=result.url
            const Content={
                ContentUrl:ContentUrl,
                ContentCreator:ContentCreator,
                channelId:channelId,
                length:length,
                LikeCount:0,
                DislikeCount:0,
                viewCount:0,
                isApproved:false,
                reportCount:0,
                reportReason:' '
            }
            const NewContent=new ContentData(Content)
            NewContent.save((err,result)=>{
                if(err){
                    return res.status(400).send(err)
                }
                else{
                    return res.status(200).send({message:'Upload was successful'})
                }
            })
        }
      });
}
exports.AddLikes=async(req,res)=>{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.LikeCount+=1
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newLikeCount:user.LikeCount})
        }
    })
}
exports.RemoveLikes=async(req,res)=>{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    if(!FoundContent){
        return res.status(404).send({message:'No User Found'})
    }
    if(FoundContent.LikeCount>=1){
    FoundContent.LikeCount-=1
    }
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newLikeCount:user.LikeCount})
        }
    })
}
exports.AddDislike=async(req,res)=>{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.DislikeCount+=1
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newDisLikeCount:user.DislikeCount})
        }
    })
}
exports.RemoveDislike=async(req,res)=>{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    if(!FoundContent){
        return res.status(404).send({message:'No User Found'})
    }
    if(FoundContent.DislikeCount>=1){
    FoundContent.DislikeCount+=1
    }
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newLikeCount:user.DislikeCount})
        }
    })
}
exports.AddReportCount=async(req,res)=>{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.reportCount+=1
    FoundContent.reportReason=req.body.reason
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newReportCount:user.reportCount})
        }
    })
}
exports.ChangeApproval=async(req,res)=>{
    const _id=req.body.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.isApproved=!FoundContent.isApproved
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:"Approval Status has changed"})
        }
    })
}
exports.GetContent=async(req,res)=>{
    const Content=await ContentData.find()
    if(Content){
        return res.status(200).send(Content)
    }
    else{
        return res.status(404).send({message:'No User Found'})
    }
}
exports.getOneContent=async(req,res)=>{
    const _id=req.params.id
    const Content=await ContentData.findOne({_id})
    if(Content){
        return res.status(200).send(Content)
    }
    else{
        return res.status(400).send({message:"No Content Found"})
    }
}
exports.getCreator=async(req,res)=>{
    const {id}=req.params
    const Content=await ContentData.find({ContentCreator:id})
    if(Content){
        return res.status(200).send(Content)
    }
    else{
        return res.status(400).send({message:"No Content Found"})
    }
}
exports.getChannel=async(req,res)=>{
    const {id}=req.params
    const Content=await ContentData.find({channelId:id})
    if(Content){
        return res.status(200).send(Content)
    }
    return res.status(400).send({message:'Content not found'})
}