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
    isAlbumOfTheWeek: Boolean,
    uri: String,
    user: mongoose.Schema.Types.ObjectId,
    ratings: [mongoose.Schema.Types.ObjectId]
});

albumSchema.statics.getAlbum = async function(filter) {
    return this.findOne(filter).populate({
        model: 'Track',
        path: 'tracks',
        populate : {
            path: 'likes',
            model: 'User',
            select: {'username':1, '_id':0}
        }

        })
        .populate({
            model: 'User',
            path: 'user',

        })
        .populate({
            model: 'Rating',
            path: 'ratings'
        })
        .exec();
}
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;