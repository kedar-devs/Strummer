const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ReplySchema=Schema({
    parentReply:{type:String},
    likes:{type:Number},
    dislikes:{type:Number},
    replyContent:{type:String}
})
const ReplyData=mongoose.model('Reply',ReplySchema)
module.exports=ReplyData
