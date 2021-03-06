const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
  },
  given_name: {
    type: String,
    required: true,
  },
  family_name: {
    type: String,
  },
  subscriber: {
    type: Boolean,
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
