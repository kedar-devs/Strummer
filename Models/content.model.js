const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ContentSchema=Schema({
    ContentUrl:{type:String,required:true},
    ContentCreator:{type:mongoose.Schema.Types.ObjectId,required:true},
    LikeCount:{type:Number},
    DislikeCount:{type:Number},
    length:{type:Double},
    viewCount:{type:Number},
        
})