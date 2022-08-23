const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment Content is required'],
      minLength: [2, 'comment should be at least 2 characters in length'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Comment', CommentSchema);
