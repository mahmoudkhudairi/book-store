const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');
const { getUserBooks, getUserFavorites } = require('../controllers/user');
router.use(authenticate);
router.get('/profile/:id', getUserBooks);
router.route('/favorite-books/').get(getUserFavorites);
module.exports = router;
