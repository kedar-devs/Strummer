const ChannelData=require('./../Models/content.model')
exports.AddChannel=async(req,res)=>{
    const {channelName,about,channelCreator}=req.body
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
    const NewChannel=new CharacterData(channel)
    NewChannel.save((err,user)=>{
        if(err){
            return res.status(200).send(err)
        }
        else{
            return res.status(200).send({message:'Channel Added Succesfully'})
        }
    })
}
exports.editChannelName=async(req,res)=>{
    const {_id,newName}=req.body
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
}
exports.AddSubscriber=async(req,res)=>{
    const {_id}=req.body
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
    const {_id}=req.body
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