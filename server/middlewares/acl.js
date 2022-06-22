const Book = require('../models/book');
const ErrorResponse = require('../utils/errorResponse');
const acl = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', '_id name email');
    if (book.createdBy._id.toString() === req.user._id) {
      next();
    } else {
      next(new ErrorResponse('NOT AUTHORIZED', null, 403));
    }
  } catch (error) {
    next(new ErrorResponse('NOT AUTHORIZED', null, 403));
  }
};
module.exports = acl;
