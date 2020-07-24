const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Models
const Post = require('../../models/Post');
const User = require('../../models/User');

const getController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const postController = async (req, res) => {
  const { title, username, link, tag } = req.body;
  try {
    const newPost = new Post({
      title,
      username,
      link,
      tag,
    });
    const response = await newPost.save();
    res.json({ response, added: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteController = async (req, res) => {
  try {
    const removed = await Post.findByIdAndRemove(req.params.postId);
    //check if the record exists
    if (!removed) {
      throw Error('Record not found');
    }
    res.status(200).json({ deleted: true, rtn: removed });
  } catch (err) {
    res.status(400).json({ msg: err.message, deleted: false });
  }
};

const patchController = async (req, res) => {
  try {
    if (req.body.type == 'like') {
      const post = await Post.findByIdAndUpdate(req.params.postId, {
        $set: { numOfLikes: numOfLikes + 1 },
      });
      if (post === null) {
        throw Error('Record not found');
      }
      const user = await User.findByIdAndUpdate(req.params.postId, {
        $push: {
          likedPosts: req.params.postId,
        },
      });
      if (user === null) {
        throw Error('User not found');
      }
    } else if (req.body.type == 'comment') {
      const post = await Post.findByIdAndUpdate(req.params.postId, {
        $push: {
          comments: {
            comment: req.body.comment,
            user: req.body.username,
            date: Date.now,
          },
        },
      });
      if (post === null) {
        throw Error('Record not found');
      }
    }
    res.status(200).json({ modified: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, modified: false });
  }
};

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getController);

// @route   POST api/posts
// @desc    Add new post
// @access  Private
router.post('/', auth, postController);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', auth, deleteController);

// @route   PATCH api/posts/:id
// @desc    Like or comment on the post
// @access  Private
router.patch('/:id', auth, patchController);

module.exports = router;
