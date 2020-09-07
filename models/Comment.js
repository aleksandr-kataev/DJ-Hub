const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
