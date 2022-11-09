const cloudinary=require("cloudinary").v2
cloudinary.config({
    cloud_name:'dwxxqd2zu',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_ENV
})
module.exports=cloudinary