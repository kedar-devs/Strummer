const mongoose=require("mongoose")
const Schema=mongoose.Schema
const chatSchema=Schema({
    SendBy:{type:mongoose.Schema.Types.ObjectId,required:true},
    SentTo:{type:mongoose.Schema.Types.ObjectId,required:true},
    message:{type:String,required:true},
    likeCount:{type:[mongoose.Schema.Types.ObjectId],required:true},
    dislikeCount:{type:[mongoose.Schema.Types.ObjectId],required:true},
})
const Chat=mongoose.model("Chat",chatSchema)
module.exports=Chat