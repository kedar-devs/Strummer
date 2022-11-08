const UserData = require("../Models/User.model")
const ReplyData = require("../Models/VideoRelatedStuff/Reply.model")

exports.AddReply=async(req,res)=>{
    const {parentReply,replyContent,accessToken,commentId}=req.body
    const FoundUser=await UserData.findOne({accessToken})
    const Reply={
        parentReply:parentReply,
        commentId:commentId,
        replyContent:replyContent,
        likes:0,
        disikes:0,
        replierId:FoundUser._id
    }
    const NewReplies=new ReplyData(Reply)
    NewReplies.save((err,reply)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:"Reply added Succesfully"})

        }
    })

}
exports.AddLike=async(req,res)=>{
    const {id}=req.body
    const FoundReply=await ReplyData.findOne({_id:id})
    FoundReply.likeCount+=1
    FoundReply.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count Increased Succesfully'})
        }
    })
}
exports.AddDislike=async(req,res)=>{
    const {id}=req.body
    const FoundReply=await ReplyData.findOne({_id:id})
    FoundReply.disLikeCount+=1
    FoundReply.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count Increased Succesfully'})
        }
    })
}
exports.RemoveLike=async(req,res)=>{
    const {id}=req.body
    const FoundReply=await ReplyData.findOne({_id:id})
    if(FoundReply.likeCount==0){
        return res.status(200).send({message:'Count cant be increased'}) 
    }
    FoundReply.likeCount-=1
    FoundReply.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count decreased Succesfully'})
        }
    })
}
exports.RemoveDisLike=async(req,res)=>{
    const {id}=req.body
    const FoundReply=await ReplyData.findOne({_id:id})
    if(FoundReply.disLikeCount==0){
        return res.status(200).send({message:'Count cant be increased'}) 
    }
    FoundReply.disLikeCount-=1
    FoundReply.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count decreased Succesfully'})
        }
    })
}
