const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2
exports.UploadImage=(req)=>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        console.log(req.files.Pp)
      streamifier.createReadStream(req.files.Pp.data).pipe(stream);
    });
}