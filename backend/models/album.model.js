const mongoose = require('mongoose');
const Track = require('./track.model');
const User = require('./user.model');
const Artist = require('./artist.model');
const Rating = require('./rating.model');

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
    oldPopularity: Number,
    genres: [String]
}, { toJSON: {virtuals: true},
toObject: { virtuals: true }});

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

    async populateAlbum() {
        let albumDoc = this.toObject();
        
        albumDoc.tracks = await (Track.find({ track_id : { $in : this.tracks_array }})
            .populate( { model: 'User', path: 'likes', select: 'username' } ));
        albumDoc.user = await (User.findById( { _id: this.user }, 'username'));
        albumDoc.ratings = await (Rating.find( { _id : {$in : this.ratings }}))
            .populate( { model: 'User', path: 'user', select: 'username' } );

        const artist = await (Artist.find({artist_id: this.artist_id}));
        albumDoc.artist = artist[0];
        return albumDoc;
    }

    static async findById(id) {
        const album = await this.findOne(id);
        const albumDoc = album.populateAlbum();
        return albumDoc;
    }

    static async findByYear(year) {
        const stringifiedYear = JSON.stringify(year);

        let albums = await this.find({
            releaseDate: { $eq: stringifiedYear}
        }).populate({model:'Artist', path:'artist'});

        return albums;
    }

    static async findByIsAlbumOfTheWeek() {
        let album = await this.findOne({isAlbumOfTheWeek: true});
        const albumDoc = album.populateAlbum();
        return albumDoc;
    }

    static async getReleaseDates() {
        return await this.distinct('releaseDate');
    }

    static async addAlbum(request,date, isWeeklyAlbum, user) {
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
        let newAlbum = await this.create(data);
        return newAlbum;
    }
}

albumSchema.loadClass(Album);
const AlbumModel = mongoose.model('Album', albumSchema);

module.exports = AlbumModel;