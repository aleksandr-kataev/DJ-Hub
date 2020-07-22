const express = require('express');
const router = express.Router();

//Post model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts));
});

// @route   POST api/posts
// @desc    Add new post
// @access  Public
router.post('/', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.authorID,
    link: req.body.link,
    tag: req.body.tag,
  });
  newPost.save().then((post) => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Add new post
// @access  Public
router.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) =>
      post
        .remove()
        .then(() => res.json({ deleted: true }))
        .catch((err) => res.status(500).json({ deleted: false, error: err }))
    )
    .catch((err) =>
      res.status(404).json({ deleted: false, error: 'Record not found' })
    );
});

module.exports = router;
