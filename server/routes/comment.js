const express = require('express');
const authenticate = require('../middleware/auth');
const acl = require('../middleware/acl');
const router = express.Router();
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

router.use(authenticate);
router.route('/:bookId/comments').get(getComments);
router.route('/:bookId/add-comment').post(addComment);
router
  .route('/:bookId/comments/:commentId')
  .put(acl({ isComment: true }), updateComment)
  .delete(acl({ isComment: true }), deleteComment);
module.exports = router;
