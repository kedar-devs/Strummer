const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Coach=Schema({
    creatorName:{type:String,required:[true,'creator name is required'],unique:[true,'creator name should be unique']},
    followers:{type:Number,required:true},
    earned:{type:Schema.Types.Decimal128,required:true},
    email:{type:String,required:[true,'email is required']},
    password:{type:String,required:[true,'password is required']},
    Channel:{type:[mongoose.Schema.Types.ObjectId]},
    parentId:{type:mongoose.Schema.Types.ObjectId},
    // earningCount:{type:Double},
    accessToken:{type:String,}
    

})
const Creator= mongoose.model("Creator",Coach)
module.exports=Creator