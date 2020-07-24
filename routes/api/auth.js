const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config').JWT_SECRET;
const auth = require('../../middleware/auth');

//User model
const User = require('../../models/User');
const Post = require('../../models/Post');

const regController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Not all fields have been entered' });
  }

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      throw {
        err: 'username_taken',
        errDescription: 'Found the same username in the database',
        error: new Error(),
      };

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      throw {
        err: 'email_registered',
        errDescription: 'Found the same email in the database',
        error: new Error(),
      };

    const salt = await bcrypt.genSalt(10);
    if (!salt)
      throw {
        err: 'genSalt_failed',
        errCode: 'Was not able to generate salt for encryption',
        error: new Error(),
      };

    const hash = await bcrypt.hash(password, salt);
    if (!hash)
      throw {
        err: 'hash_failed',
        errDescription: 'Was not able to has the password',
        error: new Error(),
      };

    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    if (!savedUser)
      throw {
        err: 'save_failed',
        errDescription: 'Was not able to save new user',
        error: new Error(),
      };

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    if (!token)
      throw {
        err: 'jwt.sign_failed',
        errDescription: 'Was not able to assign a token',
        error: new Error(),
      };

    res.status(200).json({
      token,
      newUser: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.err, errorDescription: err.errDescription });
  }
};

const authController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Not all fields have been entered' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      throw {
        err: 'email_not_found',
        errDescription: 'No provided email found',
        error: new Error(),
      };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw {
        err: 'invalid_pass',
        errDescription: 'Invalid credentials',
        error: new Error(),
      };

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token)
      throw {
        err: 'jwt_token_failed',
        errDescription: 'Could not sign the JWT token',
        error: new Error(),
      };

    res.status(200).json({
      signedIn: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: err.err,
      errorDescription: err.errDescription,
      signedIn: false,
    });
  }
};

const dataController = async (req, res) => {
  try {
    const user = await User.findOne(req.user.id).select('-password');
    if (!user)
      throw {
        err: 'user_does_not_exist',
        errDescription: 'User not found in the databse',
        error: new Error(),
      };
    res.json(user);
  } catch (err) {
    res.status(400).json({
      error: err.err,
      errorDescription: err.errDescription,
    });
  }
};

const postsDataController = async (req, res) => {
  try {
    const posts = await Post.find({ username: req.body.username });
    if (!posts)
      throw {
        err: '.find_failed',
        errDescription: 'Was not able to retrieve posts',
        error: new Error(),
      };
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      error: err.err,
      errorDescription: err.errDescription,
    });
  }
};

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', regController);

// @route   POST api/users
// @desc    Auth user
// @access  Public
router.post('/', authController);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, dataController);

// @route   GET api/auth/user/posts
// @desc    Get user posts
// @access  Private
router.get('/user/posts', auth, postsDataController);

module.exports = router;
