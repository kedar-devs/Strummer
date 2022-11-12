const express=require('express')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const app=express()
require('dotenv').config()
require('./DB/DbConnection')
const ChannelRoute=require('./Routes/Channel.Routes')
const CoachRoute=require('./Routes/Coach.Routes')
const ContentRoute=require('./Routes/Content.Routes')
const UserRoute=require('./Routes/User.Routes')
app.use("/Creator",CoachRoute)
app.use("/Content",ContentRoute)
app.use("/User",UserRoute)
app.use("/Channel",ChannelRoute)
app.use(cors())
app.use(fileUpload())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use()
module.exports=app