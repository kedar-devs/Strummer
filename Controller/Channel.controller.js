const ChannelData=require('./../Models/Channel.model')
exports.AddChannel=async(req,res)=>{
    console.log(req.body)
    try{
    const {channelName,about,channelCreator}=req.body
    const FoundChannel=await ChannelData.findOne({channelName})
    if(FoundChannel){
        return res.status(400).send({message:'A user with that Name Already exist'})
    }
    const channel={
        channelName:channelName,
        channelSubCount:0,
        playlist:[],
        about:about,
        socialInsta:req.body.socialInsta?req.body.socialInsta:' ',
        socialFB:req.body.socialFB?req.body.socialFB:' ',
        socialTwit:req.body.socialTwit?req.body.socialTwit:' ',
        channelCreator:channelCreator
    }
    const NewChannel=new ChannelData(channel)
    NewChannel.save((err,user)=>{
        console.log(user)
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'Channel Added Succesfully'})
        }
    })
}catch{
    return res.status(400).send({message:err})
}
}
exports.editChannelName=async(req,res)=>{
    const {_id,newName}=req.body
    try{
    const FoundChannel=await ChannelData.findOne({_id})
    FoundChannel.channelName=newName
    FoundChannel.save((err,user)=>{
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'ChannelName Updated Succesfully'})
        }
    })
}catch(err){
    return res.status(400).send(err)
}
}
exports.AddSubscriber=async(req,res)=>{
    const {_id}=req.params
    const FoundChannel=await ChannelData.findOne({_id})
    FoundChannel.channelSubCount+=1
    FoundChannel.save((err,user)=>{
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'Subscriber Added Succesfully'})
        }
    })
}
exports.removeSubscriber=async(req,res)=>{
    const {_id}=req.params
    const FoundChannel=await ChannelData.findOne({_id})
    if(FoundChannel.channelSubCount>0){
    FoundChannel.channelSubCount-=1
    }
    FoundChannel.save((err,user)=>{
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'Subscriber Removed Succesfully'})
        }
    })
}
exports.editSocial=async(req,res)=>{
    const {_id}=req.body
    const FoundChannel=await ChannelData.findOne({_id})
    FoundChannel.socialFB=req.body.socialFB?req.body.socialFB:FoundChannel.socialFB
    FoundChannel.socialInsta=req.body.socialInsta?req.body.socialInsta:FoundChannel.socialInsta
    FoundChannel.socialTwit=req.body.socialTwit?req.body.socialTwit:FoundChannel.socialTwit
    FoundChannel.save((err,user)=>{
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'Subscriber Removed Succesfully'})
        }
    })
} 
exports.GetAllChannel=async(req,res)=>{
    const AllChannel=await ChannelData.find()
    if(AllChannel){
        return res.status(200).send(AllChannel)
    }
    else{
        return res.status(400).send({message:'No User Found'})
    }
}  
exports.getOneChannel=async(req,res)=>{
    const _id=req.params.id
    const OneChannel=await ChannelData.findOne({_id})
    if (OneChannel){
        return res.status(200).send(OneChannel)
    }
    else{
        return res.status(400).send({message:'No user with that id found'})
    }
}
exports.getCreatorChannel=async(req,res)=>{
    const channelCreator=req.params.creator
    const FoundChannel=await ChannelData.find({channelCreator})
    if(FoundChannel){
        return res.status(200).send(FoundChannel)
    }
    else{
        return res.status(400).send({message:'User no found'})
    }
}