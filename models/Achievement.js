const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    name: String,
    description: String,
    criteria: String,
    hidden: { type: Boolean, default: false },
    tiers: [{
        tier: Number,
        requirement: String,
        reward: String
    }]
});

module.exports = mongoose.model('Achievement', achievementSchema);
