const cloudinary = require('../configs/cloudinary.config');

const upload = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(imageUrl);
    req.body.imageUrl = uploadResponse.secure_url;
    next();
  } catch (err) {
    next(err.message);
  }
};

module.exports = upload;
