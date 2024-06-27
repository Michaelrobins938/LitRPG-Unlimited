const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Guild', guildSchema);
