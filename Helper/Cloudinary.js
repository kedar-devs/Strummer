const cloudinary=require("cloudinary").v2
require('dotenv').config()
cloudinary.config({
    cloud_name:'dwxxqd2zu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports=cloudinary