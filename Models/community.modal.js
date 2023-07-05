const mongoose=require("mongoose")
const Schema=mongoose.Schema
const CommunitySchema=Schema({
    channelId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    message:{type:String,required:true},
    mssgimage:{type:String},
    mssgResponse:{type:[mongoose.Schema.Types.ObjectId]}
})
const Community=mongoose.model('Community',CommunitySchema)
module.exports=Community 
