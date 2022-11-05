const mongoose=require('mongoose')
const Schema=mongoose.Schema
const PlaylistSchema=Schema({
    VideoCount:{type:Number},
    ChannelID:{type:mongoose.Schema.Types.ObjectId},
    channelName:{type:String},
    ContentList:{type:[mongoose.Schema.Types.ObjectId]}
})
const ReplyData=mongoose.model('Reply',PlaylistSchema)
module.exports=ReplyData
