const cloudinary = require('../configs/cloudinary.config');

const uploadImage = async (bookId, imageUrl) => {
  console.log('WHATI S', process.env.CLOUDINARY_FOLDER_NAME);
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      public_id: bookId,
      folder: process.env.CLOUDINARY_FOLDER_NAME,
    });
    return uploadResponse.secure_url;
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteImage = async (bookId) => {
  try {
    await cloudinary.uploader.destroy(`${process.env.CLOUDINARY_FOLDER_NAME}/${bookId}`);
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = { uploadImage, deleteImage };
