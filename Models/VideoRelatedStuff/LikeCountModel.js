const mongoose=require('mongoose')
const Schema=mongoose.Schema
const LikeCount=Schema({
    ContentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    DateTime:{type:Date}  
})
const Likes=mongoose.model('likes',LikeCount)
module.exports=Likes