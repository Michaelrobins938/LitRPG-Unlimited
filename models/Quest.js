const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
    name: String,
    description: String,
    expReward: Number,
    achievementUnlock: String
});

module.exports = mongoose.model('Quest', questSchema);
