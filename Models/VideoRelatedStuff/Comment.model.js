const mongoose=require('mongoose')
const Schema=mongoose.Schema
const CommentSchema=Schema({
    comment:{type:String,required:true},
    commentorName:{type:String},
    commentorID:{type:String},
    commentDp:{type:String},
    likeCount:{type:String},
    disLikeCount:{type:String},
    replyCount:{type:Number}
})
const CommentData=mongoose.model('Comment',CommentSchema)
module.exports=CommentData