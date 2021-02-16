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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Rating'
    }
});

albumSchema.statics.getAlbum = async function(filter) {
    return this.findOne(filter)
    .populate({
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
            select: {'username':1, '_id':1}

        })
        .populate({
            model: 'Rating',
            path: 'ratings',
            select: {'album':0},
            populate: {
                path:'user',
                model: 'User',
                select: {'username':1, '_id':1}
            }
        })
        .exec();
}
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;