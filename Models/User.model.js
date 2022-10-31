const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UserDetail=Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pasword:{type:String,required:true},
    Courses:{type:[String]},
    contact:{type:Number,required:true},
    profilePic:{type:String,required:false},
})
const UserData=new mongoose.Model('User',UserDetail)
module.exports=UserData