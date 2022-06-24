const Book = require('../models/book');
const User = require('../models/user');
const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');

const getPublicBooks = async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      const {
        data: { items },
      } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
      );
      const books = items.reduce((acc, item) => {
        const { volumeInfo, id } = item;
        const book = {
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          publisher: volumeInfo.publisher,
          publishedDate: volumeInfo.publishedDate,
          imageUrl: volumeInfo.imageLinks.thumbnail,
          description: volumeInfo.description,
          _id: id,
        };
        acc.push(book);
        return acc;
      }, []);

      res.json(books);
    } catch (err) {
      next(new ErrorResponse(err.message));
    }
  } else {
    res.json(require('../models/booksApiSample'));
  }
};
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({}).populate('createdBy', '_id name email');
    res.json(books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create({ ...req.body, createdBy: req.user._id });
    res.json(newBook);
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};

const getBookById = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const book = await Book.findById(id).populate('createdBy', '_id name email');
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const updateBook = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    res.json(updatedBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};
const deleteFromFavorites = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favoriteBooks: id } },
      { new: true },
    );
    await Book.findByIdAndUpdate(id, { $inc: { favoriteCount: -1 } }, { new: true });
    res.json(user);
  } catch (err) {
    console.log('ADD TO FAV ERROR', err);
    next(new ErrorResponse(err.message));
  }
};
const addToFavorites = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favoriteBooks: id } },
      { new: true },
    );
    await Book.findByIdAndUpdate(id, { $inc: { favoriteCount: 1 } }, { new: true });
    res.json(user);
  } catch (err) {
    console.log('ADD TO FAV ERROR', err);
    next(new ErrorResponse(err.message));
  }
};

module.exports = {
  getBooks,
  getPublicBooks,
  createBook,
  getBookById,
  deleteBook,
  updateBook,
  addToFavorites,
  deleteFromFavorites,
};
