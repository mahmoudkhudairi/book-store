const Book = require('../models/book');
const ErrorResponse = require('../utils/errorResponse');

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const createBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    res.json(newBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const getBookById = async (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  try {
    const book = Book.findOne({ _id });
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = Book.findByIdAndDelete(req.params.id);
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
    const updatedBook = Book.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    res.json(updatedBook);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

module.exports = { getBooks, createBook, getBookById, deleteBook, updateBook };
