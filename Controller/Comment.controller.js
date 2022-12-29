const UserData = require("../Models/User.model")
const CommentData = require("../Models/VideoRelatedStuff/Comment.model")

exports.AddComment=async(req,res)=>{
    try{
    const {comment,commentorID,contentId}=req.body
    const FoundUser=await UserData.findOne({_id:commentorID})
    const Comment={
        comment:comment,
        contentId:contentId,
        commentorName:FoundUser.name,
        commmentDp:FoundUser.ProfilePic,
        likeCount:0,
        disLikeCount:0,
        replyCount:0
    }
    const NewComment=new CommentData({Comment})
    NewComment.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Comment Added Sucessfully'})
        }
    })
    }catch(err){
        console.log(err)
    }
}
exports.IncreaseCount=async(req,res)=>{
    const {id}=req.body
    const FoundComment=await CommentData.findOne({_id:id})
    FoundComment.replyCount+=1
    FoundComment.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count Increased Succesfully'})
        }
    })
}
exports.AddLike=async(req,res)=>{
    const {id}=req.body
    const FoundComment=await CommentData.findOne({_id:id})
    FoundComment.likeCount+=1
    FoundComment.save((err,user)=>{
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
    const FoundComment=await CommentData.findOne({_id:id})
    FoundComment.disLikeCount+=1
    FoundComment.save((err,user)=>{
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
    const FoundComment=await CommentData.findOne({_id:id})
    if(FoundComment.likeCount==0){
        return res.status(200).send({message:'Count cant be increased'}) 
    }
    FoundComment.likeCount-=1
    FoundComment.save((err,user)=>{
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
    const FoundComment=await CommentData.findOne({_id:id})
    if(FoundComment.disLikeCount==0){
        return res.status(200).send({message:'Count cant be increased'}) 
    }
    FoundComment.disLikeCount-=1
    FoundComment.save((err,user)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send({message:'Count decreased Succesfully'})
        }
    })
}