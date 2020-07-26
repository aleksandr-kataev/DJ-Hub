const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const PostSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: uuid.v4(),
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: String,
    required: true,
  },

  numOfLikes: {
    type: Number,
    default: 0,
  },
  numOfComments: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
