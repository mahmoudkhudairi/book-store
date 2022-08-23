const Comment = require('../models/comment');
const ErrorResponse = require('../utils/errorResponse');
const getComments = async (req, res, next) => {
  const page = Number(req.query.page) || 0;
  const commentsPerPage = 5;
  //due to MongoDB 4.4 known bug with sorting adding _id resolve duplicate of noneUnique values on sorting
  try {
    const comments = await Comment.find({})
      .where('bookId')
      .equals(req.params.bookId)
      .sort({ createdAt: -1, _id: -1 })
      .skip(page * commentsPerPage)
      .limit(commentsPerPage)
      .populate('createdBy', '_id name email profilePicture');
    const commentsCount = await Comment.count({ bookId: req.params.bookId });
    res.json({ comments, commentsCount });
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};

const addComment = async (req, res, next) => {
  const {
    params: { bookId },
    user,
    body,
  } = req;
  try {
    const comment = await Comment.create({
      ...body,
      createdBy: user._id,
      bookId: bookId,
    });
    let newComment = await comment.populate('createdBy', '_id name email profilePicture');
    res.json(newComment);
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};
const updateComment = async (req, res, next) => {
  const {
    params: { commentId },
    body,
  } = req;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', '_id name email profilePicture');
    res.json(updatedComment);
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};
const deleteComment = async (req, res, next) => {
  const {
    params: { commentId },
  } = req;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.json(deletedComment);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

module.exports = {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
