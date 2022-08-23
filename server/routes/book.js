const express = require('express');
const authenticate = require('../middleware/auth');
const acl = require('../middleware/acl');
const router = express.Router();
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
router.route('/').get(getBooks).post(createBook);
router
  .route('/:id')
  .get(getBookById)
  .put(acl({ isComment: false }), updateBook)
  .delete(acl({ isComment: false }), deleteBook);
module.exports = router;
