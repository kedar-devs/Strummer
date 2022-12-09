const { Double } = require('mongodb')
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Coach=Schema({
    creatorName:{type:String,required:true,unique:true},
    followers:{type:Number,required:true},
    earned:{type:Schema.Types.Decimal128,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    Channel:{type:[mongoose.Schema.Types.ObjectId]},
    parentId:{type:mongoose.Schema.Types.ObjectId},
    // earningCount:{type:Double},
    accessToken:{type:String,}
    

})
const Creator= mongoose.model("Creator",Coach)
module.exports=Creator