import cloudinary from "./Cloudinary";

const UploadCloudinary = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);
  return new Promise(async (resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder,
        },
        (error, result) => {
          if (error) {
            reject(error.message);
          }
          resolve({
            public_id: result.public_id,
            url: result.url,
          });
        }
      )
      .end(bytes);
  });
};

export default UploadCloudinary;
