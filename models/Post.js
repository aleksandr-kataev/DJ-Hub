const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  author: {
    //user ID
    type: String,
    required: true,
  },
  numOfLikes: {
    type: Number,
    default: 0,
    required: true,
  },
  numOfComments: {
    type: Number,
    default: 0,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
    required: true,
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

module.exports = Post = mongoose.model('post', PostSchema);
