const ErrorResponse = require('../utils/errorResponse');
const authenticate = async (req, res, next) => {
  try {
    if (req.user.role === 'ADMIN') {
      next();
    }
  } catch (error) {
    next(new ErrorResponse('Unauthorized user', null, 401));
  }
};
module.exports = authenticate;
