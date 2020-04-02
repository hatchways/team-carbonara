const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    url: {
        type: String,
    },
    timezone: {
        type: Map,
    },
    availability: {
        type: Map,
    },
    calendars: {
        type: Array,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;