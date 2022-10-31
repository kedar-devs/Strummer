const mongoose=require('mongoose')
const Schema=mongoose.Schema

const UserDetail=Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pasword:{type:String,required:true},
    Courses:{type:[String]},
    contact:{type:Number,required:true},
    profilePic:{type:String,required:false},
    isCoach:{type:Boolean,required:true},
    CoachId:{type:mongoose.Schema.Types.ObjectId}
    
})
const UserData=new mongoose.Model('User',UserDetail)
module.exports=UserData