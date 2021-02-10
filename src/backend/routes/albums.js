const router = require('express').Router();
const generate = require('./generateToken');
const Album = require('../models/album.model');
const User = require('../models/user.model');
const helpers = require('./helpers/albumsHelper');
const Artist = require('../models/artist.model');
const Track = require ('../models/track.model');




router.route('/:albumId').get(function(req, res) {
    const albumId = req.params['albumId'];

    Album.findOne({
        album_id: albumId
    })
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

    })
    .exec(function(err, album) {
        console.log(album.tracks[0].likes[0]);
        res.json(album);
    })
});

router.route('/likeTrack').post(async function(req, res) {
    // get user id tied to like
    const user = await User.findOne({
        username: 'Andrew'
    });
    // add user to likes array
    const trackId = req.body['trackId'];
    const filter = {track_id: trackId};
    const update = {likes: user._id}
    const track = await Track.findOneAndUpdate(filter, update);
    
});

router.route('/').get((req, res) => {
    // don't display tracks when displaying all albums
    Album.find({}, {tracks:0})
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/favoriteSong').put((req, res) => {

});

router.route('/add').post(generate.getToken, async function(req, res, next){
    const token = res.locals.token;

    let album = helpers.setupAlbum(req.body);
    let album_id = album['album_id'];
    let artist_id = album['artist_id'];
    

    // get artist and update or insert the info
    let artistInfo = await helpers.getArtistInfo(token, artist_id);
    //  let artist = helpers.updateArtist(artistInfo, artist_id);
    let artist = await helpers.updateArtist(artistInfo, artist_id);
    // get user that is attached to the album
    const user = await User.findOne({
        username: album['user']
    }); 
    // insert the tracks, artist, and user into the album object
    album['artist_id'] = artist._id;
    album['genres'] = artist.genres;
    album['user'] = user._id;

    let trackList = await helpers.getTracks(token, album_id);
    let tracks = await helpers.createNewTracks(helpers.parseTracks(trackList));
    album['tracks'] = tracks;
    const newAlbum = new Album(album);
    album_id = helpers.createAlbum(newAlbum, artist, user, tracks);

    // get tracklist

    const url = 'http://localhost:3000/albums/' + album_id;
    res.redirect(url)
});

module.exports = router;