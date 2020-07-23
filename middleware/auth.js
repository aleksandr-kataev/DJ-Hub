const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  //Token check
  if (!token) return res.status(401).json({ err: 'Unauthorized user' });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ err: 'Token is not valid' });
  }
};
