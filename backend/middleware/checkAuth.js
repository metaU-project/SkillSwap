const ERROR_CODES = require('../utils/errors');

const checkAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: ERROR_CODES.UNAUTHORIZED });
  }
  next();
};

module.exports = checkAuth;
