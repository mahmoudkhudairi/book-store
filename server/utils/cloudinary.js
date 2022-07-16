const cloudinary = require('../configs/cloudinary.config');

const uploadImage = async (id, imageUrl, folder) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      public_id: id,
      folder,
    });
    return uploadResponse.secure_url;
  } catch (err) {
    throw new Error(err.message);
  }
};
const deleteImage = async (bookId, folder) => {
  try {
    await cloudinary.uploader.destroy(`${folder}/${bookId}`);
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = { uploadImage, deleteImage };
