const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Coach=Schema({
    creatorName:{type:String,required:true},
    followers:{type:Number,required:true},
    channelName:{type:String,required:true},
    earned:{type:Double,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    Channel:{type:[mongoose.Schema.Types.ObjectId]},
    earningCount:{type:Double},
    

})
const Creator=mongoose.model("Creator",Coach)
module.exports=Creator