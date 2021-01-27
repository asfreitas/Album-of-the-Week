const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true, 
        trim: true,
    },
    artist: {
        type: String, 
        required: true,
        unique: false, 
        trim: true,
    },
    songs: [{
        type: String,
        required: true
    }],
    cover: String,
    date: Date,
    genre: String,
    isAlbumOfWeek: Boolean
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;