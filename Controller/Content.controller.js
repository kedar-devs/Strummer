const ContentData = require("../Models/content.model");
const cloudinary = require('cloudinary').v2

exports.CreateNewContent=async(req,res)=>{
    const {ContentCreator,length,channelId}=req.body
    const videoFile=req.files.video
    cloudinary.v2.uploader.upload_large(videoFile, {
        chunk_size: 7000000
      }, (error, result) => {
        if(error){
            return res.status(400).send({err})
        }
        else{
            console.log(result)
            const ContentUrl=result
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
exports.AddDislike=async(req,res)=>{
    const _id=req.body.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.DislikeCount+=1
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
    const _id=req.body.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.reportCount+=1
    FoundContent.reportReason=req.body.reason
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newLikeCount:user.reportCount})
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
