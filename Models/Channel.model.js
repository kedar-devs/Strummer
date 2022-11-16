const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ChannelSchema=Schema({
    channelName:{type:String,reqired:true,unique:true},
    channelSubCount:{type:Number,required:true},
    playlist:{type:[String]},
    about:{type:String,required:true},
    socialInsta:{type:String},
    socialFB:{type:String},
    socialTwit:{type:String},
    channelCreator:{type:mongoose.Schema.Types.ObjectId}
    
})
const ChannelData=mongoose.model('Channel',ChannelSchema)
module.exports=ChannelData