const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    album_id: String,
    title: String,
    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    },
    tracks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Track'
    },
    cover: String,
    date: Date,
    genres: [String],
    isAlbumOfWeek: Boolean,
    uri: String,
    user: mongoose.Schema.Types.ObjectId,
    ratings: [mongoose.Schema.Types.ObjectId]
});

albumSchema.methods.update = function(album) {
    console.log(album);
}

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;