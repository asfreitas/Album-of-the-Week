const mongoose = require('mongoose');

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
    releaseDate: String,
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

class Album {
    
    static populateAlbum(album) {
       return album.populate({
            path:'tracks',
            populate: {
                model: 'User',
                path: 'likes',
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
                select: { 'album' : 0 },
                populate: {
                    path:'user',
                    model: 'User',
                    select: { 'username': 1, '_id': 1 }
                }
            }).exec();
    }

    static findById(id) {
        let album = this.findOne(id);
        return this.populateAlbum(album);
    }

    static getByYear(year) {
        const stringifiedYear = String(year);
        let album = this.find({
            releaseDate: { $eq: stringifiedYear}
        });
        return this.populateAlbum(album);
    }

    static findByIsAlbumOfTheWeek() {
        let album = this.findOne({isAlbumOfTheWeek: true});
        album = this.populateAlbum(album);
        return album;
    }
    
    getYear() {
        return `${this.year}`;
    }
}

/*

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
        releaseDate: new Date(request.release_date).getUTCFullYear(),
        date: date
    }
    console.log(data);
    const newAlbum = new Album(data);
    await newAlbum.save();
    return request;
}
const Album = mongoose.model('Album', albumSchema);
*/

albumSchema.loadClass(Album);
const AlbumModel = mongoose.model('Album', albumSchema);
module.exports = AlbumModel;