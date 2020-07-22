const express = require('express');
const router = express.Router();

//Post model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Not all fields have been entered' });
  }
});

module.exports = router;
