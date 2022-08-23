const Book = require('../models/book');
const Comment = require('../models/comment');
const ErrorResponse = require('../utils/errorResponse');
const acl = ({ isComment }) => {
  return async (req, res, next) => {
    try {
      if (isComment) {
        const comment = await Comment.findById(req.params.commentId).populate(
          'createdBy',
          '_id name email',
        );
        if (comment.createdBy._id.toString() === req.user._id) {
          next();
        } else {
          next(new ErrorResponse('NOT AUTHORIZED', null, 403));
        }
      } else {
        const book = await Book.findById(req.params.id).populate('createdBy', '_id name email');
        if (book.createdBy._id.toString() === req.user._id) {
          next();
        } else {
          next(new ErrorResponse('NOT AUTHORIZED', null, 403));
        }
      }
    } catch (error) {
      next(new ErrorResponse('NOT AUTHORIZED', null, 403));
    }
  };
};

module.exports = acl;
