const mongoose = require('mongoose');
const fetch = require('../routes/helpers/fetch');
const helpers = require('../routes/helpers/albumsHelper');

const albumSchema = new mongoose.Schema({
    album_id: String,
    title: String,
    artist_id: {
        type: String,
        ref: 'Artist'
    },
    tracks_array: {
        type: [String],
        ref: 'Track'
    },
    cover: String,
    releaseDate: Date,
    date:Date,
    isAlbumOfTheWeek: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Rating'
    },
    popularity: Number,
    oldPopularity: Number
}, {toJSON: {virtuals: true},
toObject: {virtuals:true}});
albumSchema.virtual('artist', {
    ref: 'Artist',
    localField: 'artist_id',
    foreignField: 'artist_id',
    justOne: true
});

albumSchema.virtual('tracks', {
    ref: 'Track',
    localField: 'tracks_array',
    foreignField: 'track_id',

});

albumSchema.statics.getAlbum = async function(filter) {
    return this.findOne(filter)
    .populate({
        path:'tracks',
        populate: {
            model: 'User',
            path: 'likes dislikes',
            select: 'username',
        }
    })
        .populate({
            model: 'User',
            path: 'user',
            select: 'username'
        })
        .populate('artist')
        .populate({
            model: 'Rating',
            path: 'ratings',
            select: {'album':0},
            populate: {
                path:'user',
                model: 'User',
                select: {'username':1, '_id':1}
            }
        }).exec();
}
albumSchema.statics.getYear = async function(year) {
    console.log(new Date(year));
    return await Album.find({
        releaseDate: {
            $lte: new Date(String(year) + '-12-31'),
            $gte: new Date(String(year) + '-1-1')

        }
    }).populate('artist');
}
albumSchema.statics.addAlbum = async function(request,date, isWeeklyAlbum, user) {

    const newTracks = request.tracks.items.map(track => track.id);
    const data = {
        album_id: request.id,
        title: request.name,
        artist_id: request.artists[0].id,
        tracks_array: newTracks,
        cover: request.images[0].url,
        isAlbumOfTheWeek: isWeeklyAlbum,
        popularity: request.popularity,
        oldPopularity: request.popularity,
        user: user,
        releaseDate: new Date(request.release_date),
        date: date
    }
    const newAlbum = new Album(data);
    await newAlbum.save();
    return request;
}
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;