const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { HTTPError } = require('../../util');
const { JWT_SECRET } = require('../../config');
const auth = require('../../middleware/auth');

const router = express.Router();

// User model
const User = require('../../models/User');
const Post = require('../../models/Post');

const regController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new HTTPError('Not all fields have been entered', 400);
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new HTTPError('username_taken', 400);
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw new HTTPError('email_registered', 400);
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw new HTTPError('genSalt_failed', 500);
    }

    const hash = await bcrypt.hash(password, salt);
    if (!hash) {
      throw new HTTPError('hash_failed', 500);
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw new HTTPError('.save()_failed', 500);
    }

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600,
    });

    if (!token) {
      throw new HTTPError('jwt.sign_failed', 500);
    }

    res.status(200).json({
      token,
      newUser: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(err.code).json({ err: err.message, registered: false });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new HTTPError('empty_fields', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new HTTPError('email_not_found', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HTTPError('invalid pass', 400);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) {
      throw new HTTPError('jwt_token_failed', 500);
    }

    res.status(200).json({
      signedIn: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(err.code).json({ err: err.message, signedIn: false });
  }
};

const dataController = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.body.userID }).select(
      '-password',
    );
    if (!user) throw Error('user_does_not_exist');
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const postsDataController = async (req, res) => {
  try {
    const posts = await Post.findOne({ username: req.body.username });
    if (!posts) throw Error('.find_failed');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// @route   POST api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', regController);

// @route   POST api/user/login
// @desc    Authorize user
// @access  Public
router.post('/login', loginController);

// @route   GET api/user/:id
// @desc    Get user data
// @access  Private
router.get('/:id', auth, dataController);

// @route   GET api/user/:id/posts
// @desc    Get user posts
// @access  Private
router.get('/:id/posts', auth, postsDataController);

module.exports = router;
