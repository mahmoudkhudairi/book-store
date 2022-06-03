const express = require('express');
const router = express.Router();

const { getUserBooks } = require('../controllers/user');
router.get('/profile/:id', getUserBooks);

module.exports = router;
