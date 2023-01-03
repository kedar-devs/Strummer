const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Subscription=Schema({
    ChannelId:{type:mongoose.Schema.Types.ObjectId,required:true},
    UserId:{type:mongoose.Schema.Types.ObjectId,required:true},
    DateTime:{type:Date}
})
const Subscriber=mongoose.model('Subscriber',Subscription)
module.exports=Subscriber