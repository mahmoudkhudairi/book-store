'use strict';
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const SECRET = process.env.JWT_SECRET;
const Book = require('../models/book');
const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
    const userToken = jwt.sign(userData, SECRET);
    res
      .status(201)
      .cookie('userToken', userToken, {
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
      })
      .json({
        successMessage: 'user created!',
        user: userData,
      });
  } catch (err) {
    next(new ErrorResponse(err.message, err.errors));
  }
};

const login = async (req, res, next) => {
  const userRecord = await User.findOne({ email: req.body.email });
  if (!userRecord) {
    next(new ErrorResponse('Invalid email or password', null, 401));
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(req.body.password, userRecord.password);
      if (!isPasswordValid) {
        next(new ErrorResponse('Invalid email or password', null, 401));
      } else {
        const userData = {
          _id: userRecord._id,
          name: userRecord.name,
          email: userRecord.email,
        };
        const userToken = jwt.sign(userData, SECRET);
        res
          .cookie('userToken', userToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000000),
          })
          .json({
            successMessage: 'logged in Successfully',
            user: userData,
          });
      }
    } catch (err) {
      next(new ErrorResponse('Invalid email or password', null, 401));
    }
  }
};

const logout = (req, res, next) => {
  res.clearCookie('userToken');
  res.json({
    message: 'You have successfully logged out!',
  });
};
const getLoggedInUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('_id name email profilePicture favDict');
    res.json(user);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};
const getUserBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('books');
    res.json(user.books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};
const getUserFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favoriteBooks',
      populate: { path: 'createdBy', select: '_id name email' },
    });
    res.json(user.favoriteBooks);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};
const toggleFavorites = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    if (body.addToFav) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { favoriteBooks: id }, $set: { ['favDict.' + id]: true } },
        { new: true },
      );
      await Book.findByIdAndUpdate(id, { $inc: { favoriteCount: 1 } }, { new: true });
      res.json(user);
    } else {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { favoriteBooks: id }, $unset: { ['favDict.' + id]: 1 } },

        { new: true },
      );
      await Book.findByIdAndUpdate(id, { $inc: { favoriteCount: -1 } }, { new: true });
      res.json(user);
    }
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUserInfo,
  getUserBooks,
  toggleFavorites,
  getUserFavorites,
};
