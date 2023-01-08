const ChannelData = require("../Models/Channel.model")
const Subscriber = require("../Models/VideoRelatedStuff/Subscription.Model")
const ChannelController=require('./Channel.controller')

exports.AddSubscription=async(req,res)=>{
    try{
    const {channelId,userId}=req.body
    const Subscription={
        ChannelId:channelId,
        UserId:userId
    }
    const NewSubScription=new Subscriber(Subscription)
    NewSubScription.save(async(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).send({err})
        }
        else{
            const updateStatus=await ChannelController.AddSubscriber(channelId)
            console.log(updateStatus)
            if(updateStatus){
            return res.status(200).send({result})
            }
            return res.status(400).send({message:'Channel Sub Count Increase fail'})
        }
    })

    }catch(err){
        console.log(err)
        return res.status(501).send({err})
    }
}
exports.RemoveSubscription=async(req,res)=>{
    try{
        const {id}=req.params
        const FoundSubscription=await Subscriber.findOneAndDelete({ChannelId:id})
        if(FoundSubscription){
            const UpdatedStatus=await ChannelController.removeSubscriber(id)
            console.log(UpdatedStatus)
            if(UpdatedStatus){
            return res.status(200).send({message:'Subscription removed Succesfully'})
            }
            return res.status(400).send({message:'Channel sub Count wasnt increased'})
        }
        else{
            return res.status(404).send({message:'No Subscription Found'})
        }
    }catch(err){
        console.log(err)
        return res.status(501).send({err})
    }
}

exports.checkSubscribers=async(req,res)=>{
    try{
    const {userId,channelId}=req.body
    const FoundSubscription=await Subscriber.findOne({ChannelId:channelId,UserId:userId})
    if(FoundSubscription){
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

exports.getSubscription=async(req,res)=>{
    try{
        const {id}=req.params
        var result=[]
        const FoundSubscription=await Subscriber.find({UserId:id})
        if(FoundSubscription){
            let channel={}
            for(let i=0;i<FoundSubscription.length;i++){
                channel=await ChannelData.findOne({_id:FoundSubscription[i].ChannelId})
                if(channel){
                    result.push(channel)
                }
            }
            return res.status(200).send(result)
        }
        else{
            return res.status(404).send({message:'No Subscription Found'})
        }
    }catch(err){
        console.log(err)
        return res.status(501).send({err})
    }
}