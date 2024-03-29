const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authors
 *         - publisher
 *         - publishedDate
 *         - description
 *         - imageUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         authors:
 *           type: string
 *           description: The book authors
 *         publisher:
 *           type: string
 *           description: The book publisher
 *         publishedDate:
 *           type: string
 *           description: The book publishedDate
 *         description:
 *           type: string
 *           description: The book description
 *         imageUrl:
 *           type: string
 *           description: The book image
 *         favoriteCount:
 *           type: number
 *           description: The book favoriteCount
 *         createdBy:
 *           type: mongoose.Schema.Types.ObjectId
 *           description: The user id
 *         status:
 *           type: string
 *           description: The book status
 *           enum: ['APPROVED', 'DECLINED', 'PENDING']
 *           default: 'PENDING'
 *       example:
 *         title: bookTitle
 *         authors: [autherName]
 *         publisher: publisherName
 *         publishedDate: may, 2010
 *         description: some text description
 *         imageUrl: image url
 */
const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book Title is required'],
      minLength: [5, 'title should be at least 5 characters in length'],
    },
    authors: {
      type: [String],
      required: [true, 'Book Authors are required'],
      validate: [value => value.length > 0, 'At least 1 Author is required'],
    },
    publisher: {
      type: String,
      required: [true, 'Book Publisher is required'],
    },
    publishedDate: {
      type: String,
      required: [true, 'Book Publish Date is required'],
    },
    description: {
      type: String,
      required: [true, 'Book Description is required'],
      minLength: [20, 'Description should be at least 20 characters long'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Book Image is required'],
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['APPROVED', 'DECLINED', 'PENDING'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.pre('save', async function (next) {
  try {
    this.imageUrl = await cloudinary.uploadImage(
      this._id,
      this.imageUrl,
      process.env.CLOUDINARY_BOOKS_FOLDER_NAME,
    );
    next();
  } catch (e) {
    next(e.message);
  }
});
BookSchema.pre('findOneAndDelete', async function (next) {
  try {
    await cloudinary.deleteImage(this.getQuery()._id, process.env.CLOUDINARY_FOLDER_NAME);
    next();
  } catch (err) {
    next(err.message);
  }
});
BookSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.imageUrl && this._update.imageUrl.length > 120) {
      this.getUpdate().imageUrl = await cloudinary.uploadImage(
        this._update._id,
        this._update.imageUrl,
        process.env.CLOUDINARY_BOOKS_FOLDER_NAME,
      );
    }
    next();
  } catch (e) {
    next(e.message);
  }
});
module.exports = mongoose.model('Book', BookSchema);
