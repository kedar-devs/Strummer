// const { Double } = require('mongodb')
const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ContentSchema=Schema({
    ContentUrl:{type:String,required:true},
    ImageThumbnail:{type:String,required:true},
    Title:{type:String,required:true},
    Description:{type:String,required:true},
    createAt:{type:Date,required:true},
    Tags:{type:[String],required:true},
    ContentCreator:{type:mongoose.Schema.Types.ObjectId,required:true},
    channelId:{type:mongoose.Schema.Types.ObjectId,required:true},
    LikeCount:{type:Number},
    DislikeCount:{type:Number},
    length:{type:Schema.Types.Decimal128},
    viewCount:{type:Number},
    inPlaylist:{type:Boolean},
    playListID:{type:mongoose.Schema.Types.ObjectId},
    isApproved:{type:Boolean,required:true},
    reportCount:{type:Number},
    reportReason:{type:String}
})
const ContentData=new mongoose.model('Content',ContentSchema)
module.exports=ContentData