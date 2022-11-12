const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ReplySchema=Schema({
    parentReply:{type:String},
    likes:{type:Number},
    dislikes:{type:Number},
    replyContent:{type:String},
    CommentId:{type:mongoose.Schema.Types.ObjectId},
    replierId:{type:mongoose.Schema.Types.ObjectId},
    videoId:{type:mongoose.Schema.Types.ObjectId}
})
const ReplyData=mongoose.model('Reply',ReplySchema)
module.exports=ReplyData
