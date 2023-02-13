const ChannelData = require("../Models/Channel.model");
const ContentData = require("../Models/content.model");
const DislikeController=require("./DisLike.controller")
const LikeController=require('./LikeController')
const cloudinary = require('cloudinary').v2
const {ErrorController}=require('./../Helper/ErrorHadler/ErrorController')
const streamifier=require('./../Helper/Streamifier');
const { ObjectId } = require("mongodb");

require('./../Helper/Cloudinary')

exports.CreateNewContent=async(req,res)=>{
    try{
    const {ContentCreator,length,channelId,Tags,Title,Description}=req.body
    const createAt=new Date()
    const videoFile=req.files.Video
    const photo=req.files.photo
            const result=await streamifier.UploadVideo(videoFile)
            const urlThumbnail=await streamifier.UploadImage(photo)
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
                LikedUser:[new ObjectId()],
                DislikeUser:[new ObjectId()],
                viewCount:0,
                isApproved:false,
                Tags:Tags,
                reportCount:0,
                reportReason:' '
            }
            const NewContent=new ContentData(Content)
            NewContent.save((err,result)=>{
                if(err){
                    let response=ErrorController(err)
                    return res.status(response.code).send({ response })
                }
                else{
                    console.log(err)
                    return res.status(200).send({message:'Upload was successful'})
                }
            })
        
      
    }
    catch(err){
        console.log(err)
    }
}
exports.AddLikeFunctionality=async(req,res)=>{
    try{
        const {userId}=req.body
        const FoundContent=await ContentData.findOne({LikedUser:{$in:userId}})
        if(FoundContent){
            return res.status(400).send({message:'User Alredy Liked'})
        }
        else{
            const FoundContent=await ContentData.findOne({_id:req.params.id})
            if(FoundContent){
                FoundContent.LikedUser.push(userId)
                FoundContent.LikeCount+=1
                FoundContent.save((err,user)=>{
                    if(err){
                        console.log(err)
                        return res.status(400).send({message:'Error Occured while saving'})
                    }
                    else{
                        return res.status(200).send({newLikeCount:user.LikeCount})
                    }
                })
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({message:'Unknown error Occured'})
    }
}
exports.AddLikes=async(req,res)=>{
    try{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    FoundContent.LikeCount+=1
    FoundContent.save((err,user)=>{
        if(err){
            let response=ErrorController(err)
            return res.status(response.code).send({ response })
        }
        else{
            return res.status(200).send({newLikeCount:user.LikeCount})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}
exports.RemoveLikesFunction=async(req,res)=>{
    try{
        const {userId}=req.body
        const FoundContent=await ContentData.findOne({LikedUser:{$in:userId}})
        if(FoundContent){
            FoundContent.LikeCount-=1
            FoundContent.LikedUser=FoundContent.LikedUser.filter(id=>id!=userId)
            FoundContent.save((err,user)=>{
                if(err){
                    return res.status(400).send({message:'Error occured while saving the data'})
                }
                else{
                    return res.status(200).send({newLikeCount:user.LikeCount})
                }
            })
        }
        else{
            return res.status(400).send({message:'No user in the like community Found'})
        }

    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}
exports.RemoveLikes=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}
exports.AddDislikeFunctionality=async(req,res)=>{
    try{
        const {userId}=req.body
        const FoundContent=await ContentData.findOne({DislikeUser:{$in:userId}})
        if(FoundContent){
            return res.status(400).send({message:'User Alredy Liked'})
        }
        else{
            const FoundContent=await ContentData.findOne({_id:req.params.id})
            if(FoundContent){
                FoundContent.DislikeUser.push(userId)
                FoundContent.DislikeCount+=1
                FoundContent.save((err,user)=>{
                    if(err){
                        console.log(err)
                        return res.status(400).send({message:'Error Occured while saving'})
                    }
                    else{
                        return res.status(200).send({newDisLikeCount:user.DislikeCount})
                    }
                })
            }
        }
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}
exports.AddDislike=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}
exports.RemoveDislikeFunction=async(req,res)=>{
    try{
        const {userId}=req.body
        const FoundContent=await ContentData.findOne({DislikeUser:{$in:userId}})
        if(FoundContent){
            FoundContent.DislikeCount-=1
            FoundContent.DislikeUser=FoundContent.DislikeUser.filter(id=>id!=userId)
            FoundContent.save((err,user)=>{
                if(err){
                    return res.status(400).send({message:'Error occured while saving the data'})
                }
                else{
                    return res.status(200).send({newDisLikeCount:user.DislikeCount})
                }
            })
        }
        else{
            return res.status(400).send({message:'No user in the like community Found'})
        }

    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}
exports.RemoveDislike=async(req,res)=>{
    try{
    const _id=req.params.id
    const FoundContent=await ContentData.findOne({_id})
    if(!FoundContent){
        return res.status(404).send({message:'No User Found'})
    }
    if(FoundContent.DislikeCount>=1){
    FoundContent.DislikeCount-=1
    }
    FoundContent.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({newDisLikeCount:user.DislikeCount})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}
exports.AddReportCount=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
    return res.status(400).send(err)
}
}
exports.ChangeApproval=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
}
}
exports.GetContent=async(req,res)=>{
    try{
    const Content=await ContentData.find()
    if(Content){
        return res.status(200).send(Content)
    }
    else{
        return res.status(404).send({message:'No User Found'})
    }
}catch(err){
    console.log(err)
}
}
exports.getOneContent=async(req,res)=>{
    try{
    const _id=req.params.id
    const Content=await ContentData.findOne({_id})
    if(Content){
        let ChannelDetail=await ChannelData.findOne({_id:Content.channelId})
        if(ChannelDetail){
            Content.DislikeCount=await DislikeController.getDislikeCount
            Content.LikeCount=await LikeController.getLikeCount
        return res.status(200).send({Content,ChannelDetail})
        }
        else{
            return res.status(400).send({message:'No channel was found'})
        }
    }
    else{
        return res.status(400).send({message:"No Content Found"})
    }
}catch(err){
    return res.status(404).send({message:err})
}
}
exports.getCreator=async(req,res)=>{
    try{
    const {id}=req.params
    const Content=await ContentData.find({ContentCreator:id})
    if(Content){
        return res.status(200).send(Content)
    }
    else{
        return res.status(400).send({message:"No Content Found"})
    }
}catch(err){
    console.log(err)
}
}
exports.getChannel=async(req,res)=>{
    try{
    const {id}=req.params
    const Content=await ContentData.find({channelId:id})
    if(Content){
        return res.status(200).send(Content)
    }
    return res.status(400).send({message:'Content not found'})
}catch(err){
    console.log(err)
}
}
exports.AddTags=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
}
}
exports.DeleteTags=async(req,res)=>{
    try{
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
}catch(err){
    console.log(err)
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
exports.IncreaseViewCount=async(req,res)=>{
try{
    
    const {id}=req.params
    console.log(id)
    const FoundVideo=await ContentData.findOne({_id:id})
    if(FoundVideo){
        FoundVideo.viewCount=FoundVideo.viewCount+1
        FoundVideo.save()
        .then(user=>{
            return res.status(200).send({viewCount:user.viewCount})
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).send({message:err})
        })
      
    }
    else{
        return res.status(404).send({message:'No Video Found'})
    }

}catch(err){
    console.log(err)
}
}
exports.ContentSearch=async(req,res)=>{
    try{
        const {key}=req.params
        const FoundContent=await ContentData.find({
            "$or":[
                {Title:{$regex:key}},
                {Description:{$regex:key}},
                {Tags:{$regex:key}}
            ]
        })
        const FoundChannel=await ChannelData.find({
            "$or":[
                {channelName:{$regex:key}}
            ]
        })
        if(FoundContent && FoundChannel){
            return res.status(200).send({FoundChannel,FoundContent})
        }
        else{
            if(FoundChannel){
                return res.status(200).send({FoundChannel,FoundContent:[]})
            }
            if(FoundContent){
                return res.status(200).send({FoundChannel:[],FoundContent})
            }
            else{
                return res.status(400).send({message:'No Content Found'})
            }
        }
    }catch(err){
            console.log(err)
    }
}
exports.checkLikeFunction=async(req,res)=>{
    try{
    const {userId}=req.body
    const FoundContent=await ContentData.findOne({LikedUser:{$in:userId}})
    if(FoundContent){
        return res.status(200).send(true)
    }
    else{
        return res.status(400).send(false)
    }
}catch(err){
    console.log(err)
    return res.status(400).send(false)
}
}
exports.checkDisLikeFunction=async(req,res)=>{
    try{
    const {userId}=req.body
    const FoundContent=await ContentData.findOne({DislikeUser:{$in:userId}})
    if(FoundContent){
        return res.status(200).send(true)
    }
    else{
        return res.status(400).send(false)
    }
}catch(err){
    console.log(err)
    return res.status(400).send(false)
}
}
exports.getLikedVideo=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundContent=await ContentData.find({LikedUser:{$in:id}})
        if(FoundContent){
            console.log(FoundContent)
            return res.status(200).send({FoundContent})
        }
        else{
            return res.status(400).send({message:'No user Found'})
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({message:'Unknown error occured'})
    } 
}