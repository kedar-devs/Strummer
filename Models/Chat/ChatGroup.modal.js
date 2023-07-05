const mongoose=require("mongoose")
const Schema=mongoose.Schema
const GroupChatSchema=Schema({
    groupName:{tpye:String,required:true},
    groupCreatedAt:{type:Date,required:true},
    groupDescription:{type:String,required:true},
    groupImg:{type:String,required:true},
    Owner:{type:mongoose.Schema.Types.ObjectId,required:true},
    admins:{type:[mongoose.Schema.Types.ObjectId],required:true},
    chats:{type:[mongoose.Schema.Types.ObjectId],required:true}
})
const Group=mongoose.model('Group',GroupChatSchema)
module.exports=Group