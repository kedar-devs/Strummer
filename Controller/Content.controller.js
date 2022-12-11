const ContentData = require("../Models/content.model");
const cloudinary = require('cloudinary').v2
require('./../Helper/Cloudinary')

exports.CreateNewContent=async(req,res)=>{
    console.log(req.body)
    try{
    const {ContentCreator,length,channelId,Tags,Title,Description}=req.body
    const createAt=new Date()
    const videoFile=req.files.video
    const photo=req.files.photo
    cloudinary.uploader.upload_large(videoFile.tempFilePath, {
        chunk_size: 7000000
      },async (error, result) => {
        if(error){
            return res.status(400).send({error})
        }
        else{
            const urlThumbnail=await cloudinary.uploader.upload(photo.tempFilePath)
            console.log(result)
            const ContentUrl=result.url
            const Content={
                ContentUrl:ContentUrl,
                ContentCreator:ContentCreator,
                ImageThumbnail:urlThumbnail.url,
                Title:Title,
                createAt:createAt,
                Description:Description,
                channelId:channelId,
                length:length,
                LikeCount:0,
                DislikeCount:0,
                viewCount:0,
                isApproved:false,
                Tags:Tags,
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
    catch(err){
        console.log(err)
    }
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
exports.AddTags=async(req,res)=>{
    const {id}=req.params
    const {tags}=req.body
    const Content=await ContentData.find({channelId:id})
    if(Content){
        Content.Tags.append(tags)
        Content.save()
        .then(result=>{
            return res.status(200).send({message:'Tags have been updated'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).send({message:'An error has Occured'})
        })
       
    }
    else{
        return res.status(400).send({message:'No user Found'})
    }
}
exports.DeleteTags=async(req,res)=>{
    const {id}=req.params
    const {tag}=req.body
    const Content=await ContentData.find({channelId:id})
    if(Content){
     Content.Tags.remove(tag)
     Content.save()
        .then(result=>{
            return res.status(200).send({message:'Tags have been updated'})
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).send({message:'An error has Occured'})
        })
    }
    else{
        return res.status(400).send({message:'No user Found'})
    }
}
exports.searchTags=async(req,res)=>{
    try{
    const {tags}=req.body
    const foundContent=await ContentData.find({Tags:{$regex:'.*'+tags+'.*'}})
    if(foundContent){
        return res.status(200).send({foundContent})
    }
    else{
        return res.status(400).send({message:'No video with this tag was found'})
    }
    }catch(err){
        return res.status(500).send(err)
    }
}
