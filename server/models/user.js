const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    timezone: {
        type: Map,
        required: true,
    },
    availability: {
        type: Map,
        required: true,
    },
    calendars: {
        type: Array,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;