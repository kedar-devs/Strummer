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
      streamifier.createReadStream(req.data).pipe(stream);
    });
}
exports.UploadVideo=(req)=>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({
            resource_type: "video",
            chunk_size: 7000000
        },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        console.log(req)
      streamifier.createReadStream(req.data).pipe(stream);
    });
}