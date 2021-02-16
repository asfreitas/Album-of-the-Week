const router = require('express').Router();
const generate = require('./generateToken');
const Album = require('../models/album.model');
const User = require('../models/user.model');
const helpers = require('./helpers/albumsHelper');
const Artist = require('../models/artist.model');
const Track = require ('../models/track.model');

router.route('/album/:albumId').get(async function(req, res) {
    const albumId = req.params['albumId'];
    const filter = {album_id: albumId};
    
    const album = await Album.getAlbum(filter);
    res.json(album);
});

router.route('/getWeeklyAlbum').get(async function(req,res) {
    const filter = {isAlbumOfTheWeek: true};

    const album = await Album.getAlbum(filter);
    res.json(album);

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


router.route('/add').post(generate.getToken, async function(req, res, next){
    const token = res.locals.token;

    let album = helpers.setupAlbum(req.body);
    let album_id = album['album_id'];
    let artist_id = album['artist_id'];
    
    const isWeeklyAlbum = album['isAlbumOfTheWeek']
    if(isWeeklyAlbum) {
        const filter = {isAlbumOfTheWeek: true};
        const oldWeeklyAlbum = await Album.getAlbum(filter);
        if(oldWeeklyAlbum)
        {
            oldWeeklyAlbum.isAlbumOfTheWeek = false;
            oldWeeklyAlbum.save();
        }
    }

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
    newAlbum.save()
    .then(doc => {
        user.albums.push(doc._id);
        artist.albums.push(doc._id);
        artist.save();
        user.save();
        res.end();
    });
});

module.exports = router;