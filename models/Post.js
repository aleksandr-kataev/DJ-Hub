const mongoose = require('mongoose');
const uuid = require('uuid');

const Comment = require('./Comment');

const { Schema } = mongoose;

const PostSchema = new Schema({
  id: {
    type: String,
    default: uuid.v4(),
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  username: {
    type: String,
    required: true,
  },
  numOfLikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [Comment],
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
