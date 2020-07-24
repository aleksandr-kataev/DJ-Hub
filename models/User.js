const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  bio: {
    type: String,
  },
  likedPosts: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model('user', UserSchema);
