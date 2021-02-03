const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    album_id: String,
    title: {
        type: String,
    },
    artist_id: mongoose.Schema.Types.ObjectId,
    tracks: [{name: String, length: Number, track_id: String,
    favorites: [mongoose.Schema.Types.ObjectId],
    unfavorites: [mongoose.Schema.Types.ObjectId]}],
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