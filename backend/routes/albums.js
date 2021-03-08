const router = require('express').Router();
const helpers = require('./helpers/albumsHelper');
const fetch = require ('./helpers/fetch');
const Album = require('../models/album.model');
const User = require('../models/user.model');
const Artist = require('../models/artist.model');
const Track = require ('../models/track.model');
const TokenGenerator = require('./helpers/tokens/token');

const tokenGenerator = new TokenGenerator();

async function getWeeklyAlbum(req, res, next) {
    if(req.query.year) {
        res.locals.year = Number(req.query.year);
    }
    else {
        const filter = {isAlbumOfTheWeek: true};
        const album = await Album.getAlbum(filter);
        res.locals.album = album;
        res.locals.year = album.releaseDate.getFullYear();
    }
    next();
}


router.route('/getWeeklyAlbum').get(getWeeklyAlbum, async function(req,res) {
    console.log(res.locals.album);
    res.json(res.locals.album);

});
router.route('/test').get(function(req,res) {
    res.json('test')
})
router.route('/likeTrack').post(async function(req, res) {
    // get user id tied to like
    console.log(req.body);
    const user = await User.findOne({
        username: req.body.user
    });
    // add user to likes array
    const trackId = req.body['trackId'];
    const filter = {track_id: trackId};
    const update = {likes: user._id}
    const track = await Track.findOne(filter);
    track.likes.addToSet(user._id);
    track.save();
    
});

router.route('/dislikeTrack').post(async function(req, res) {
    // get user id tied to like
    const user = await User.findOne({
        username: req.body.user
    });
    // add user to likes array
    const trackId = req.body['trackId'];
    const filter = {track_id: trackId};
    const update = {'$push': { dislikes : user._id}}
    const track = await Track.findOne(filter);
    track.dislikes.addToSet(user._id);
    track.save();
    
});

router.route('/').get((req, res) => {
    // don't display tracks when displaying all albums

    Album.find({}, {tracks:0})
    .populate('artist')
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getYears').get(async function(req,res) {
    let dates = await Album.find({}, 'releaseDate');
    dates = dates.map(date => date.releaseDate.getFullYear());
    let set = new Set(dates);
    dates = Array.from(set);
    res.send(dates);
})

router.route('/year').get(getWeeklyAlbum, async function(req,res) {
    const year = res.locals.year;
    const album = await Album.getYear(year);
    res.send(album);
});

router.route('/add').post(async function(req, res, next){
    //console.log(req.body);
    const token = tokenGenerator.getToken();
    let album = helpers.setupAlbum(req.body);
    let album_id = album['album_id'];

    const headers =  {
        'Authorization': 'Bearer ' + token
    };
    const url = 'https://api.spotify.com/v1/albums/' + album_id;
    const request = await fetch.getData(url, headers, undefined, 'GET');
    const artist = await helpers.getArtistInfo(token, req.body.artist_id.id);

    // create or update artist name 

    const isWeeklyAlbum = album['isAlbumOfTheWeek']
    if(isWeeklyAlbum) {
        const filter = {isAlbumOfTheWeek: true};
        const oldWeeklyAlbum = await Album.getAlbum(filter);
        console.log('the old weekly album is....\n\n' + oldWeeklyAlbum);
        if(oldWeeklyAlbum)
        {
            oldWeeklyAlbum.isAlbumOfTheWeek = false;
            oldWeeklyAlbum.save();
        }
    }
    const albumInfo = {
        isAlbumOfTheWeek: JSON.parse(isWeeklyAlbum),
     }
    const user = await User.findOne({
        username: album['user']
    }); 
    await Album.addAlbum(request,album.date, isWeeklyAlbum, user._id);
    await Track.addTracks(request);
    await Artist.addArtist(artist, album_id)
    console.log('finished adding');
    res.sendStatus(501);
});
router.route('/:albumId').get(async function(req, res) {
    const albumId = req.params['albumId'];
    const filter = {album_id: albumId};
    
    const album = await Album.getAlbum(filter);
    res.json(album);
});

module.exports = router;