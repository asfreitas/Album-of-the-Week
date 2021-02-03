const router = require('express').Router();
const generate = require('./generateToken');
const Album = require('../models/album.model');
const User = require('../models/user.model');
const helpers = require('./helpers/albumsHelper');
const Artist = require('../models/artist.model');


router.route('/').get((req, res) => {
    // don't display tracks when displaying all albums
    Album.find({}, {tracks:0})
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:albumId').get((req, res) => {
    const albumId = req.params['albumId'];
    Album.findOne({
        album_id: albumId
    })
    .then(album => res.json(album))
    .catch(err =>res.status(400).json('Error: ' + err));

});

router.route('/add').post(generate.getToken, function(req, res, next){
    const token = res.locals.token;

    let album = helpers.setupAlbum(req.body);
    let album_id = album['album_id'];
    let artist_id = album['artist_id'];
    
   (async () => {
        // get tracklist
        let trackList = await helpers.getTracks(token, album_id);
        let tracks = helpers.parseTracks(trackList);

        // get artist and update or insert the info
        let artistInfo = await helpers.getArtistInfo(token, artist_id);
      //  let artist = helpers.updateArtist(artistInfo, artist_id);
      let artist = await helpers.updateArtist(artistInfo, artist_id);
        // get user that is attached to the album
        const user = await User.findOne({
            username: album['user']
        }); 
        // insert the tracks, artist, and user into the album object
        album['tracks'] = tracks;
        album['artist_id'] = artist._id;
        album['user'] = user._id;
        const newAlbum = new Album(album);
        helpers.createAlbum(newAlbum, artist, user);

   })();
   const url = 'http://localhost:3000/albums/' + album_id;
   res.redirect(url)
});

module.exports = router;