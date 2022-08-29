const mongoose = require('mongoose');
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - bookId
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         content:
 *           type: string
 *           description: The comment content
 *         bookId:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: The book id
 *         createdBy:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: The user id
 *       example:
 *         _id: 630aab0ad9f63c99b4fdc328
 *         content: First comment
 *         bookId: 630aab0ad9f63c99b4fdce32
 *         createdBy: 630aab0ad9f63c99b4f21ee4
 */
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
