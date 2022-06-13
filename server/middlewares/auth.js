const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  console.log('YOOOOO');
  try {
    const user = await jwt.verify(req.cookies.userToken, process.env.JWT_SECRET);
    console.log('user', user);
    req.user = user;
    next();
  } catch (error) {
    next('Unauthenticated user');
  }
};
module.exports = authenticate;
