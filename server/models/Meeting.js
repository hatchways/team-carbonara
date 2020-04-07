const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
