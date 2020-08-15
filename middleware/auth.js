const jwt = require('jsonwebtoken');
const config = require('../config');

const { HTTPError } = require('../util');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      throw new HTTPError('Unauthorized user', 401);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded) {
      throw new HTTPError('Token is not valid', 400);
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(err.code).json({ err: err.message });
  }
};

module.exports = auth;
