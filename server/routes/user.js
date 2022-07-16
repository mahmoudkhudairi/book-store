const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const {
  getUserProfile,
  updateUserProfile,
  toggleFavorites,
  getLoggedInUserInfo,
} = require('../controllers/user');
router.use(authenticate);
router.get('/user-info', getLoggedInUserInfo);
router.get('/profile/:username', getUserProfile);
router.put('/profile/:username', updateUserProfile);
router.route('/favorite/:id').put(toggleFavorites);
module.exports = router;
