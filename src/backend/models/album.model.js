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
    cover: {
        data: Buffer,
        type: String
    },

    date: {
        type: Date,
        required: true,
        unique: false
    },


});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;