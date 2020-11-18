const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    rating: {
        type: Number,
    }


});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;