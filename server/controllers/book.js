const Book = require('../models/book');
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
  const page = Number(req.query.page) || 0;
  const booksPerPage = 10;
  //due to MongoDB 4.4 known bug with sorting adding _id resolve duplicate of noneUnique values on sorting
  try {
    const books = await Book.find({ status: 'APPROVED' })
      .sort({ createdAt: -1, _id: -1 })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .populate('createdBy', '_id name email');
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
    const book = await Book.findById(id)
      .where('status')
      .equals('APPROVED')
      .populate('createdBy', '_id name email');
    res.json(book);
  } catch (err) {
    next(new ErrorResponse(`cannot find book with id ${id}`));
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
    const updatedBook = await Book.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', '_id name email');
    res.json(updatedBook);
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};
const getDashboardData = async (req, res, next) => {
  const page = Number(req.query.page) || 0;
  const booksPerPage = Number(req.query.booksPerPage) || 10;
  //due to MongoDB 4.4 known bug with sorting adding _id resolve duplicate of noneUnique values on sorting
  try {
    const books = await Book.find({})
      .sort({ status: -1, createdAt: -1, _id: -1 })
      .skip(page * booksPerPage)
      .limit(booksPerPage)
      .populate('createdBy', '_id name email');
    const booksCount = await Book.count({});
    res.json({ books, booksCount });
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};

module.exports = {
  getBooks,
  getPublicBooks,
  createBook,
  getBookById,
  deleteBook,
  updateBook,
  getDashboardData,
};
