const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;