const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        unique: true, 
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        unique: false
    },

});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;