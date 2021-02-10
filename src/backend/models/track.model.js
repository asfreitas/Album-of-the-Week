const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    track_id: String,
    name: String,
    length: Number,
    sample: String,
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    dislikes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    popularity: Number,
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;