const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Coach=require('./Coach.model')
const UserDetail=Schema({
    name:{type:String,required:true,default:'User123'},
    email:{type:String,unique:true,required:true},
    pasword:{type:String,required:true,default:'User@123'},
    Courses:{type:[String]},
    contact:{type:Number,required:true,unique:true},
    otp:{type:String,required:true},
    ProfilePic:{type:String,required:false},
    isCoach:{type:Boolean,required:true},
    CoachId:{type:mongoose.Schema.Types.ObjectId,ref:"Coach"},
    accessToken:{type:String,required:true,expireAfterSeconds: 864000 },
    refreshToken:{type:String,required:true},
    resetToken:{type:String,required:true}
    
})
const UserData=new mongoose.Model('User',UserDetail)
module.exports=UserData