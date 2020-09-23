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
    const posts = await Post.find(
      {},
      { _id: false, comments: false },
    ).sort({
      date: -1,
    });
    if (!posts) throw new HTTPError('.find()_failed', 500);
    return res.json(posts);
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const getPostController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.find({ id }, { _id: false });
    if (!post) throw new HTTPError('.find()_failed', 500);
    return res.json(post);
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const getUsersPostsController = async (req, res) => {
  const { username } = req.params;

  try {
    const userExists = await User.exists({ username });
    if (!userExists) {
      throw new HTTPError('user_not_found', 400);
    }

    const posts = await Post.find({ username }, { _id: false }).sort({
      date: -1,
    });
    if (!posts) throw new HTTPError('.find()_failed', 500);
    return res.json(posts);
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const getUsersLikedPostsController = async (req, res) => {
  const { username } = req.params;

  try {
    const userExists = await User.exists({ username });
    if (!userExists) {
      throw new HTTPError('user_not_found', 400);
    }

    const posts = await Post.find({}, { _id: false }).sort({
      date: -1,
    });

    if (!posts) throw new HTTPError('post.find()_failed', 500);

    const user = await User.findOne(
      { id: req.user.id },
      'linkedPosts',
    );
    if (!user) throw new HTTPError('user.find()_failed', 500);

    const likedPosts = posts.filter((post) => user.includes(post.id));

    return res.json(likedPosts);
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const postPostController = async (req, res) => {
  const { title, username, link, tag } = req.body;

  try {
    if (!title || !username || !link || !tag) {
      throw new HTTPError('empty_fields', 400);
    }

    const userExists = await User.exists({ username });
    if (!userExists) {
      throw new HTTPError('user_not_found', 400);
    }

    const newPost = new Post({
      title,
      username,
      link,
      tag,
    });

    const response = await newPost.save();
    if (!response) throw new HTTPError('.save()_failed', 500);

    const user = await User.findOneAndUpdate(
      { username },
      {
        $push: {
          posts: response.id,
        },
      },
      { new: true },
    );

    if (!user) throw new HTTPError('Failed to update', 500);
    return res.status(200).json({ response });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ err: 'link_taken' });
    }
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const deletePostController = async (req, res) => {
  const { id } = req.user;
  const { postID } = req.params;

  try {
    const postExists = await Post.exists({ id: postID });
    if (!postExists) {
      throw new HTTPError('post_does_not_exist', 400);
    }

    const userExists = await User.exists({ id });
    if (!userExists) {
      throw new HTTPError('user_not_found', 400);
    }

    const removed = await Post.remove({ id: postID });
    if (!removed || removed.n === 0) {
      throw new HTTPError('post_not_removed', 500);
    }

    const user = await User.updateOne(
      { id },
      { $pull: { posts: postID } },
      { safe: true, multi: true },
    );
    if (!user) {
      throw new HTTPError('user_not_updated', 500);
    }

    const usersLiked = await User.updateMany(
      {},
      { $pull: { likedPosts: postID } },
      { safe: true, multi: true },
    );

    if (!usersLiked) {
      throw new HTTPError('users_liked_post_failed_to_update', 500);
    }

    return res.status(200).json({ deleted: true });
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const likeController = async (req, res) => {
  const { id } = req.user;
  const { postID } = req.params;
  try {
    const postExists = await Post.exists({ id: postID });
    if (!postExists) throw new HTTPError('post_not_found', 400);

    const userExists = await User.exists({ id });
    if (!userExists) {
      throw new HTTPError('user_ not_found', 400);
    }

    const post = await Post.findOneAndUpdate(
      { id: postID },
      { $inc: { numofLikes: 1 } },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('post_not_found', 500);
    }

    const user = await User.findOneAndUpdate(
      { id },
      {
        $push: {
          likedPosts: postID,
        },
      },
      { new: true },
    );
    if (!user) {
      throw new HTTPError('user_not_found', 500);
    }

    return res.status(200).json({ postID });
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const unlikeController = async (req, res) => {
  const { id } = req.user;
  const { postID } = req.params;
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
      { id },
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

    return res.status(200).json({ postID });
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const commentController = async (req, res) => {
  const { username, postID } = req.params;
  const { comment } = req.body;

  try {
    if (!comment) throw new HTTPError('empty_comment', 400);

    const postExists = await Post.exists({ id: postID });
    if (!postExists) throw new HTTPError('post_not_found', 400);

    if (!username || !postID) {
      throw new HTTPError('username_or_postID_null', 400);
    }

    const commentObj = {
      commentID: uuid.v4(),
      comment,
      username,
      date: new Date(),
    };

    const post = await Post.findOneAndUpdate(
      { id: postID },
      {
        $push: {
          comments: commentObj,
        },
        $inc: { numofComments: 1 },
      },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('post_not_updated', 500);
    }

    return res.status(200).json({ comment: commentObj, postID });
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

const delCommentController = async (req, res) => {
  const { postID, commentID } = req.params;
  try {
    if (!commentID || !postID) {
      throw new HTTPError('commentID_or_postID_null', 400);
    }

    const postExists = await Post.exists({ id: postID });
    if (!postExists) throw new HTTPError('post_not_found', 400);

    const post = await Post.findOneAndUpdate(
      { id: postID },
      {
        $pull: {
          comments: { id: commentID },
        },
        $inc: { numofComments: -1 },
      },
      { new: true },
    );
    if (!post) {
      throw new HTTPError('post_not_updated', 500);
    }

    return res.status(200).json({ deleted: true });
  } catch (err) {
    if (!err.code) return err;
    return res.status(err.code).json({ msg: err.message });
  }
};

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPostsController);

// @route   GET api/posts/:id
// @desc    Get post based on id
// @access  Public
router.get('/:id', getPostController);

// @route   GET api/posts/:username
// @desc    Get users posts
// @access  Public
router.get('/:username', getUsersPostsController);

// @route   GET api/posts/liked/:username
// @desc    Get users liked posts
// @access  Public
router.get('/liked/:username', getUsersLikedPostsController);

// @route   POST api/posts
// @desc    Add new post
// @access  Private
router.post('/', auth, postPostController);

// @route   DELETE api/posts/
// @desc    Delete post
// @access  Private
router.delete('/:postID', auth, deletePostController);

// @route   POST api/posts/:postID/like/
// @desc    Like a post
// @access  Private
router.post('/:postID/like', auth, likeController);

// @route   DELETE api/posts/:postID/unlike/
// @desc    Unlike a post
// @access  Private
router.delete('/:postID/unlike', auth, unlikeController);

// @route   POST api/posts/:postID/comment/
// @desc    Comment on a post
// @access  Private
router.post('/:postID/comment/:username', auth, commentController);

// @route   DELETE api/posts/:postID/delComment
// @desc    Delete a comment on a post
// @access  Private
router.delete(
  '/:postID/delComment/:commentID',
  auth,
  delCommentController,
);

module.exports = router;
