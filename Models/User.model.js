const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Coach=require('./Coach.model')
const UserDetail=Schema({
    name:{type:String,required:[true,'UserName is required'],default:'User123'},
    email:{type:String,unique:[true,'Email should be unique'],required:[true,'Email is required']},
    password:{type:String,required:[true,'Password is required'],default:'User@123'},
    Courses:{type:[String]},
    contact:{type:Number,required:[true,'Contact is required'],unique:[true,'Contact should be unique,this contact already exist']},
    otp:{type:String,required:true},
    ProfilePic:{type:String,required:false},
    isCoach:{type:Boolean,required:true},
    CoachId:{type:mongoose.Schema.Types.ObjectId,ref:"Coach"},
    accessToken:{type:String,required:true,expireAfterSeconds: 864000 },
    refreshToken:{type:String,required:true},
    resetToken:{type:String,required:true}
    
})
const UserData=mongoose.model('User',UserDetail)
module.exports=UserData