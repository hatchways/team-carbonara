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
    // error when family name not available
  },
  sub: {
    type: String,
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
    type: String,
  },
  availability: {
    days: {
      Monday: Boolean,
      Tuesday: Boolean,
      Wednesday: Boolean,
      Thursday: Boolean,
      Friday: Boolean,
      Saturday: Boolean,
      Sunday: Boolean,
    },
    hours: {
      end: String,
      start: String,
    },
  },
  calendars: {
    type: Array,
  },
  meetings: [{ duration: Number, meetingName: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
