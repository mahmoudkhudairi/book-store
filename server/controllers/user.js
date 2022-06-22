'use strict';
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const SECRET = process.env.JWT_SECRET;
const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        profilePicture: newUser.profilePicture,
      },
      SECRET,
    );
    res
      .status(201)
      .cookie('userToken', userToken, {
        expires: new Date(Date.now() + 9000000),
      })
      .json({
        successMessage: 'user created!',
        user: newUser,
      });
  } catch (err) {
    console.log(err);
    next(new ErrorResponse(err.message));
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
          email: userRecord.email,
          name: userRecord.name,
        };
        const userToken = jwt.sign(
          userData,

          SECRET,
        );
        res
          .cookie('userToken', userToken, {
            expires: new Date(Date.now() + 600000000000),
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

const getUserBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('books');
    res.json(user.books);
  } catch (err) {
    next(new ErrorResponse(err.message));
  }
};

module.exports = {
  register,
  login,
  logout,
  getUserBooks,
};
