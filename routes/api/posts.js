const express = require('express');
const uuid = require('uuid');

const router = express.Router();
const auth = require('../../middleware/auth');
const { HTTPError } = require('../../util');

// Models
const Post = require('../../models/Post');
const User = require('../../models/User');

const getPostsController = async (req, res) => {
  try {
    const posts = await Post.find({}, { _id: false }).sort({
      date: -1,
    });
    if (!posts) throw new HTTPError('.find()_failed', 500);
    return res.json(posts);
  } catch (err) {
    return res.status(err.code).json({ msg: err.message });
  }
};

const postPostController = async (req, res) => {
  const { title, userID, link, tag } = req.body;
  try {
    const newPost = new Post({
      title,
      userID,
      link,
      tag,
    });
    const response = await newPost.save();
    if (!response) throw new HTTPError('.save()_failed', 500); /// new HTTP ERROR

    const user = await User.findOneAndUpdate(
      { id: userID },
      {
        $push: {
          posts: response.id,
        },
      },
      { new: true },
    );
    if (!user) throw new HTTPError('Failed to update', 400);
    return res.status(200).json({ response, added: true });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ err: 'link_taken' });
    }
    return res
      .status(err.code)
      .json({ msg: err.message, modified: false });
  }
};

const deletePostController = async (req, res) => {
  const { postID, userID } = req.params;
  try {
    const removed = await Post.remove({ id: postID });
    if (!removed || removed.n === 0) {
      throw new HTTPError('Record not removed', 400);
    }

    const user = await User.updateOne(
      { id: userID },
      { $pull: { posts: postID } },
      { safe: true, multi: true },
    );
    if (!user) {
      throw new HTTPError('User record not updated', 400);
    }

    const usersLiked = await User.updateMany(
      {},
      { $pull: { likedPosts: postID } },
      { safe: true, multi: true },
    );
    if (!usersLiked) {
      throw new HTTPError(
        'Users liked the post failed to updated',
        500,
      );
    }

    return res.status(200).json({ deleted: true });
  } catch (err) {
    return res
      .status(err.code)
      .json({ msg: err.message, deleted: false });
  }
};

const likeController = async (req, res) => {
  const { userID, postID } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { id: postID },
      { $inc: { numofLikes: 1 } },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('post_not_found', 400);
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
      throw new HTTPError('user_not_found', 400);
    }

    return res.status(200).json({ modified: true });
  } catch (err) {
    return res
      .status(err.code)
      .json({ msg: err.message, modified: false });
  }
};

const unlikeController = async (req, res) => {
  const { userID, postID } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { id: postID },
      { $inc: { numofLikes: -1 } },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('post_not_found', 400);
    }

    const user = await User.findOneAndUpdate(
      { id: userID },
      {
        $pull: {
          likedPosts: postID,
        },
      },
      { new: true },
    );
    if (!user) {
      throw new HTTPError('user_not_found', 400);
    }

    return res.status(200).json({ modified: true });
  } catch (err) {
    return res
      .status(err.code)
      .json({ msg: err.message, modified: false });
  }
};

const commentController = async (req, res) => {
  const { userID, postID } = req.params;
  const { comment } = req.body;
  const commentObj = {
    commentID: uuid.v4(),
    comment,
    user: userID,
    date: Date.now,
  };
  try {
    const post = await Post.findOneAndUpdate(
      { id: postID },
      {
        $push: {
          comments: commentObj,
        },
      },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('Record not found', 400);
    }
    return res
      .status(200)
      .json({ modified: true, comment: commentObj });
  } catch (err) {
    return res
      .status(err.code)
      .json({ msg: err.message, modified: false });
  }
};

const delCommentController = async (req, res) => {
  const { postID, commentID } = req.params;
  try {
    const post = await Post.findOneAndUpdate(
      { id: postID },
      {
        $pull: {
          comments: { commentID },
        },
      },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('Record not found', 400);
    }

    return res.status(200).json({ modified: true });
  } catch (err) {
    return res
      .status(err.code)
      .json({ msg: err.message, modified: false });
  }
};

// @route   GET api/posts
// @desc    Get all postss
// @access  Public
router.get('/', getPostsController);

// @route   POST api/posts
// @desc    Add new post
// @access  Private
router.post('/', auth, postPostController);

// @route   DELETE api/posts/
// @desc    Delete post
// @access  Private
router.delete('/:postID/:userID', auth, deletePostController);

// @route   POST api/posts/:postID/like/:userID
// @desc    Like a post
// @access  Private
router.post('/:postID/like/:userID', auth, likeController);

// @route   DELETE api/posts/:postID/unlike/:userID
// @desc    Unlike a post
// @access  Private
router.delete('/:postID/unlike/:userID', auth, unlikeController);

// @route   POST api/posts/:postID/comment/:userID
// @desc    Comment on a post
// @access  Private
router.post('/:postID/comment/:userID', auth, commentController);

// @route   DELETE api/posts/:postID/delComment
// @desc    Delete a comment on a post
// @access  Private
router.delete(
  '/:postID/delComment/:commentID',
  auth,
  delCommentController,
);

module.exports = router;
