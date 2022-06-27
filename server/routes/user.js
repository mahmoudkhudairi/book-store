const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const {
  getUserBooks,
  getUserFavorites,
  toggleFavorites,
  getLoggedInUserInfo,
} = require('../controllers/user');
router.use(authenticate);
router.get('/user-info', getLoggedInUserInfo);
router.get('/profile/:id', getUserBooks);
router.route('/favorite/:id').put(toggleFavorites);
router.route('/favorite-books/').get(getUserFavorites);
module.exports = router;
