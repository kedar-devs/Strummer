const Subscriber = require("../Models/VideoRelatedStuff/Subscription.Model")

exports.AddSubscription=async(req,res)=>{
    try{
    const {channelId,userId}=req.body
    const Subscription={
        ChannelId:channelId,
        UserId:userId
    }
    const NewSubScription=new Subscriber(Subscription)
    NewSubScription.save((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).send({err})
        }
        else{
            return res.status(200).send({result})
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
        const FoundSubscription=await Subscriber.findOneAndDelete({_id:id})
        if(FoundSubscription){
            return res.status(200).send({message:'Subscription removed Succesfully'})
        }
        else{
            return res.status(404).send({message:'No Subscription Found'})
        }
    }catch(err){
        console.log(err)
        return res.status(501).send({err})
    }
}