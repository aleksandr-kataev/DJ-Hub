const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Post model
const Post = require('../../models/Post');

const getController = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const postController = async (req, res) => {
  const { title, authorID, link, tag } = req.body;
  try {
    const newPost = new Post({
      title,
      authorID,
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
    const removed = await Post.findByIdAndRemove(req.params.id);
    //check if the record exists
    if (!removed) {
      throw Error('Record not found');
    }
    res.status(200).json({ deleted: true, rtn: removed });
  } catch (err) {
    res.status(400).json({ msg: err.message, deleted: false });
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
// @desc    Add new post
// @access  Private
router.delete('/:id', auth, deleteController);

module.exports = router;
