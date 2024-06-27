// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    character: String,
    model: String,
    level: {
        type: Number,
        default: 1
    },
    exp: {
        type: Number,
        default: 0
    },
    skills: {
        type: [String],
        default: []
    },
    alignment: String,
    companion: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
