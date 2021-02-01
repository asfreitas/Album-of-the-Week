const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    track_id: String,
    name: String,
    number: Number,
    length: Number,
    album: mongoose.Schema.Types.ObjectId
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;