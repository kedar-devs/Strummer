// const { Double } = require('mongodb')
const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ContentSchema=Schema({
    ContentUrl:{type:String,required:[true,'Upload to cloudinary failed , please try a file having size<15mb']},
    ImageThumbnail:{type:String,required:[true,'Image Thumbnail is required']},
    Title:{type:String,required:[true,'Title is required']},
    Description:{type:String,required:[true,'Description is required']},
    createAt:{type:Date,required:true},
    Tags:{type:[String],required:true},
    ContentCreator:{type:mongoose.Schema.Types.ObjectId,required:true},
    channelId:{type:mongoose.Schema.Types.ObjectId,required:true},
    LikedUser:{type:[mongoose.Schema.Types.ObjectId],required:true},
    LikeCount:{type:Number},
    DislikeUser:{type:[mongoose.Schema.Types.ObjectId],required:true},
    DislikeCount:{type:Number},
    length:{type:Schema.Types.Decimal128},
    viewCount:{type:Number},
    inPlaylist:{type:Boolean},
    playListID:{type:mongoose.Schema.Types.ObjectId},
    isApproved:{type:Boolean,required:true},
    reportCount:{type:Number},
    reportReason:{type:String}
})
const ContentData=mongoose.model('Content',ContentSchema)
module.exports=ContentData