const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const authenticate = async (req, res, next) => {
  try {
    const user = await jwt.verify(req.cookies.userToken, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    next(new ErrorResponse('Unauthorized user', null, 401));
  }
};
module.exports = authenticate;
