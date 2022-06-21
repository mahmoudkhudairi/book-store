const express = require('express');
const authenticate = require('../middlewares/auth');
const router = express.Router();
const cloudinary = require('../middlewares/cloudinary');
const {
  getBooks,
  getPublicBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book');
router.route('/public').get(getPublicBooks);
router.use(authenticate);
router.route('/').get(getBooks).post(cloudinary, createBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
