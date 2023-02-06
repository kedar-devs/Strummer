const UserData = require("../Models/User.model")
const CommentData = require("../Models/VideoRelatedStuff/Comment.model")

exports.AddComment=async(req,res)=>{
    try{
        
    const {comment,commentorID,contentId}=req.body
    const FoundUser=await UserData.findOne({accessToken:commentorID})
    const Comment={
        comment:comment,
        contentId:contentId,
        commentorName:FoundUser.name,
        commentDp:FoundUser.ProfilePic,
        likeCount:0,
        disLikeCount:0,
        replyCount:0
    }
    console.log(Comment)
    const NewComment=new CommentData(Comment)
    NewComment.save((err,user)=>{
        if(err){
            console.log(err)
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
    try{
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
}catch(err){
    console.log(err)
}
}
exports.AddLike=async(req,res)=>{
    try{
    const {id}=req.params
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
}catch(err){
    console.log(err)
}
}
exports.AddDislike=async(req,res)=>{
    try{
    const {id}=req.params
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
}catch(err){
    console.log(err)
}
}
exports.RemoveLike=async(req,res)=>{
    try{
    const {id}=req.params
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
}catch(err){
    console.log(err)
}
}
exports.RemoveDisLike=async(req,res)=>{
    try{
    const {id}=req.params
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
}catch(err){
    console.log(err)
}
}
exports.GetComment=async(req,res)=>{
    try{
    const {id}=req.params
    let FoundComment=await CommentData.find({contentId:id})
    if(FoundComment){
        FoundComment=FoundComment.reverse()
        return res.status(200).send(FoundComment)
    }
    else{
        return res.status(404).send({message:'No Comment Found'})
    }
    }catch(err){
        console.log(err)
    }
}