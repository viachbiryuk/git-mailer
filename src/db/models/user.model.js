const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  avatar: {
    type: String
  },
  thumb: {
    type: String
  }
}));
