const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  given_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  sessionID: {},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
