const mongoose = require('mongoose');
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
      validate: [(value) => value.length > 0, 'At least 1 Author is required'],
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Book', BookSchema);
