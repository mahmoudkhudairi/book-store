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
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      },
      SECRET,
    );
    res
      .status(201)
      .cookie(
        'userToken',
        userToken,

        {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        },
      )
      .json({
        successMessage: 'user created!',
        user: newUser,
      });
  } catch (err) {
    // let arr =
    //   'User validation failed: name: Name must be at least 3 characters long, email: user with that email already in Database.'.split(
    //     /,|:/,
    //   );
    // let obj = {};
    // for (let i = 1; i < arr.length; i += 2) {
    //   obj[arr[i]] = arr[i + 1];
    // }
    // console.log('obj', Object.keys(obj), Object.values(obj));
    console.log(err);
    next(new ErrorResponse(err.message));
  }
};

const login = async (req, res, next) => {
  const userRecord = await User.findOne({ email: req.body.email });
  if (!userRecord) {
    throw new ErrorResponse('Invalid email or password', 401);
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(req.body.password, userRecord.password);
      if (!isPasswordValid) {
        throw new ErrorResponse('Invalid email or password', 401);
      } else {
        const userToken = jwt.sign(
          {
            _id: userRecord._id,
            email: userRecord.email,
            username: userRecord.username,
          },

          SECRET,
        );
        res
          .cookie(
            'userToken',
            userToken,

            {
              expires: new Date(Date.now() + 600000000000),
              httpOnly: true,
            },
          )
          .json({
            successMessage: 'logged in Successfully',
            user: userRecord,
          });
      }
    } catch (err) {
      next(new ErrorResponse(err.message));
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
