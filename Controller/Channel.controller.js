const Creator = require('../Models/Coach.model')
const ChannelData=require('./../Models/Channel.model')
const ContentData=require('./../Models/content.model')
const cloudinary = require('cloudinary').v2
const streamifier=require('./../Helper/Streamifier')
const {ErrorController}=require('./../Helper/ErrorHadler/ErrorController')
require('./../Helper/Cloudinary')
exports.AddChannel=async(req,res)=>{
    console.log(req.body,req.files)
    try{
    const {channelName,About,channelCreator}=req.body
    let photo='https://unsplash.com/photos/mETczGm8RKg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink'
    if(req.files){
     photo=req.files.channelImage
    }

    const FoundChannel=await ChannelData.findOne({channelName})
    if(FoundChannel){
        return res.status(400).send({message:'A user with that Name Already exist'})
    }
    const channel={
        channelName:channelName,
        channelSubCount:0,
        channelImage:photo,
        playlist:[],
        about:About,
        socialInsta:req.body.socialInsta?req.body.socialInsta:' ',
        socialFB:req.body.socialFB?req.body.socialFB:' ',
        socialTwit:req.body.socialTwit?req.body.socialTwit:' ',
        channelCreator:channelCreator
    }
    if(req.files){
    channel.channelImage=await await streamifier.UploadImage(channel.channelImage)
    channel.channelImage=channel.channelImage.url
    }
    const NewChannel=new ChannelData(channel)
    NewChannel.save((err,user)=>{
        console.log(user,err)
        if(err){
            let response=ErrorController(err)
            return res.status(400).send({ response })
        }
        else{
            let id=NewChannel._id
            return res.status(200).send({id})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}
exports.editChannelImage=async(req,res)=>{
    const {id}=req.params
    try{
    const FoundChannel=await ChannelData.findOne({_id:id})
    if(!FoundChannel){
        return res.send(404,{message:'No channel was found'})
    }
    const photo=req.files.channelImage
    FoundChannel.channelImage=await cloudinary.uploader.upload(photo.tempFilePath)
    FoundChannel.save()
    .then(res=>{
        return res.status(200).send({message:'Edit was Successful'})
    })
    .catch(err=>{
        let response=ErrorController(err)
        return res.status(400).send({ response })
    })
}catch(err){
    return res.status(400).send({err})
}
}
exports.editChannelName=async(req,res)=>{
    const {_id,newName}=req.body
    try{
    const FoundChannel=await ChannelData.findOne({_id})
    FoundChannel.channelName=newName
    FoundChannel.save((err,user)=>{
        if(err){
            let response=ErrorController(err)
            return res.status(response.code).send({ response })
        }
        else{
            return res.status(200).send({message:'ChannelName Updated Succesfully'})
        }
    })
}catch(err){
    return res.status(400).send(err)
}
}
exports.AddSubscriber=async(channelId)=>{
    try{
    const _id=channelId
    const FoundChannel=await ChannelData.findOne({_id})
    let Flag=0
    if(FoundChannel){
    FoundChannel.channelSubCount+=1
    const status=await FoundChannel.save()
    if(status.channelSubCount){
    return true
    }
    else{
        return false
    }
        // if(err){
        //     console.log(err)
            
        // }
        // else{
        //     console.log(user)
        //     Flag=1
        // }
  
    // if(Flag==1){
    //     return true
    // }
    // else{
    //     return false
    // }
}
else{
    return false
}
}catch(err){
    console.log(err)
    return false
}
}
exports.removeSubscriber=async(channelId)=>{
    try{
    const _id=channelId
    const FoundChannel=await ChannelData.findOne({_id})
    if(FoundChannel.channelSubCount>0){
    FoundChannel.channelSubCount-=1
    const status=await FoundChannel.save()
    console.log(status)
    return true
    }
    

}catch(err){
    console.log(err)
    return false
}
}
exports.editSocial=async(req,res)=>{
    try{
    const {_id}=req.body
    const FoundChannel=await ChannelData.findOne({_id})
    FoundChannel.socialFB=req.body.socialFB?req.body.socialFB:FoundChannel.socialFB
    FoundChannel.socialInsta=req.body.socialInsta?req.body.socialInsta:FoundChannel.socialInsta
    FoundChannel.socialTwit=req.body.socialTwit?req.body.socialTwit:FoundChannel.socialTwit
    FoundChannel.save((err,user)=>{
        if(err){
            let response=ErrorController(err)
            return res.status(response.code).send({ response })
        }
        else{
            return res.status(200).send({message:'Subscriber Removed Succesfully'})
        }
    })
}catch(err){
    return res.status(400).send(err)
}
} 
exports.GetAllChannel=async(req,res)=>{
    try{
    const AllChannel=await ChannelData.find()
    if(AllChannel){
        return res.status(200).send(AllChannel)
    }
    else{
        return res.status(400).send({message:'No User Found'})
    }
}catch(err){
    return res.status(400).send(err)
}
}  
exports.getOneChannel=async(req,res)=>{
    try{
    const _id=req.params.id
    const OneChannel=await ChannelData.findOne({_id})
    if (OneChannel){
        return res.status(200).send(OneChannel)
    }
    else{
        return res.status(400).send({message:'No user with that id found'})
    }
}catch(err){
    return res.status(400).send(err)
}
}
exports.getCreatorChannel=async(req,res)=>{
    try{
    const channelCreator=req.params.creator
    const FoundChannel=await ChannelData.find({channelCreator})
    if(FoundChannel){
        return res.status(200).send(FoundChannel)
    }
    else{
        return res.status(400).send({message:'User no found'})
    }
}catch(err){
    return res.status(400).send(err)
}
}
exports.getAllCreatorChannel=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundChannel=await ChannelData.findOne({_id:id})
    if(FoundChannel){
        const AllChannel=await ChannelData.find({channelCreator:FoundChannel.channelCreator})
        if(AllChannel){
            return res.status(200).send({AllChannel})
        }
        else{
            return res.status(400).send({message:'NO Additional videos Found'})
        }
    }
    else{
        return res.status(400).send({message:'NO Additional videos Found'})   
    }

    }catch(err){
        console.log(err)
    }
    
}
exports.GetAboutChannel=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundChannel=await ChannelData.findOne({_id:id})
    const channelDetails={
        channelDescr:'',
        channelInfo:{
        channelName:FoundChannel.channelName,
        channelImg:FoundChannel.channelImage,
        },
        stat:{
            channelSubCount:0,
            videoCount:0
        }
    }
    if(FoundChannel){
        channelDetails.channelDescr=FoundChannel.about
        channelDetails.stat.channelSubCount=FoundChannel.channelSubCount
        const FoundContent=await ContentData.find({channelId:FoundChannel._id})
        if(FoundContent){
            channelDetails.stat.videoCount=FoundContent.length
            return res.status(200).send({channelDetails})
        }
        else{
            return res.status(200).send({channelDetails})  
        }
    }
    else{
        return res.status(400).send({message:'No Channel Found'})  
    }
}catch(err){
    return res.status(400).send(err)
}
}
