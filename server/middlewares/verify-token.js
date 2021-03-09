const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.headers.authorization;

  const checkBearer = 'Bearer ';

  // check if token cotains bearer and remove it
  if (token.startsWith(checkBearer)) {
    token = token.slice(checkBearer.length, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      success: false,
      message: 'No token pprovided',
    });
  }
};
