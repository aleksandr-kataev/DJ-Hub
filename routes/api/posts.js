const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

// Models
const Post = require('../../models/Post');
const User = require('../../models/User');

const getController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) throw Error('.find()_failed');
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postController = async (req, res) => {
  const { title, userID, link, tag } = req.body;
  try {
    const newPost = new Post({
      title,
      userID,
      link,
      tag,
    });
    const response = await newPost.save();
    if (!response) throw Error('.save()_failed');
    const user = await User.findOneAndUpdate(
      { id: userID },
      {
        $push: {
          posts: response.id,
        },
      },
      { new: true },
    );
    if (!user) throw Error('Failed to update');
    res.status(200).json({ response, added: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteController = async (req, res) => {
  try {
    const removed = await Post.findOne({ id: req.body.id });
    // check if the record exists
    if (!removed) {
      throw Error('Record not found');
    }
    res.status(200).json({ deleted: true });
  } catch (err) {
    res.status(400).json(err);
  }
};

const patchController = async (req, res) => {
  const { type, userID, postID } = req.body;
  try {
    if (type === 'like') {
      const post = await Post.findOneAndUpdate(
        { id: postID },
        { $inc: { numofLikes: 1 } },
        { new: true },
      );
      if (!post) {
        throw Error(post);
      }
      const user = await User.findOneAndUpdate(
        { id: userID },
        {
          $push: {
            likedPosts: postID,
          },
        },
        { new: true },
      );
      if (!user) {
        throw Error('User not found');
      }
    } else if (type === 'comment') {
      const { comment } = req.body;
      const post = await Post.findOneAndUpdate(
        { id: postID },
        {
          $push: {
            comments: {
              comment,
              user: userID,
              date: Date.now,
            },
          },
        },
        { new: true },
      );
      if (!post) {
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

// @route   DELETE api/posts/
// @desc    Delete post
// @access  Private
router.delete('/', auth, deleteController);

// @route   PATCH api/posts/
// @desc    Like or comment on the post
// @access  Private
router.patch('/', auth, patchController);

module.exports = router;
