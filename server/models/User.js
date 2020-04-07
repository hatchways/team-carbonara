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
    // required: true,
  },
  sub: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  timezone: {
    type: Map,
  },
  availability: {
    type: Map,
    of: String,
  },
  calendars: {
    type: Array,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
