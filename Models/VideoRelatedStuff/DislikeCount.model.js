const mongoose=require('mongoose')
const Schema=mongoose.Schema
const DisLikeCount=Schema({
    ContentId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    DisLikeStatus:{type:Boolean,required:true},
    DateTime:{type:Date}  
})
const DisLikes=mongoose.model('Dislikes',DisLikeCount)
module.exports=DisLikes