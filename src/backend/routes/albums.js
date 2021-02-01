const router = require('express').Router();
const generate = require('./generateToken');
const Album = require('../models/album.model');
const Artist = require('../models/artist.model');
const fetch = require('../tools/fetch');
var mongoose = require('mongoose');
router.route('/').get((req, res) => {
    Album.find()
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));

});

async function getTracks(token, id) {
    const authorize = "Bearer " + token;
    const headers =  {
        'Authorization': authorize,
        'Content-Type': 'application/json'
    };
    const url = 'https://api.spotify.com/v1/albums/';
    const searchQuery = url + id + '/tracks';
    let body = fetch.getData(searchQuery, headers, undefined, 'GET');

    return body;
}
async function getArtistInfo(token, id) {
    const authorize = "Bearer " + token;
    const headers =  {
        'Authorization': authorize,
        'Content-Type': 'application/json'
    };
    const url = 'https://api.spotify.com/v1/artists/';
    const searchQuery = url + id;
    let body = fetch.getData(searchQuery, headers, undefined, 'GET');

    return body;
}

function parseTracks(tracklist) {
    let tracksArray = [];
    for(let x = 0; x < tracklist.items.length; x++) {
        let nextTrack = tracklist.items[x];
        let track = {
            name: nextTrack['name'],
            length: nextTrack['duration_ms'],
            track_id: nextTrack['id']
        }
        tracksArray.push(track);

        
    }
    return tracksArray;
}
router.route('/add').post(generate.getToken, function(req, res, next){
    const token = res.locals.token;
    
    const isAlbumOfTheWeek = JSON.parse(req.body.isAlbumOfTheWeek);
    const user = req.body.user;
    const title = req.body.title;
    const artist = req.body.artist;
    let artist_id = req.body.artist_id
    //const songs = req.body.songs;
    const cover = req.body.cover;
    const date = req.body.date;
    const album_id = req.body._id;
   // const genre = req.body.genre;
   (async () => {
        // get tracklist
        let trackList = await getTracks(token, album_id);
        let tracks = parseTracks(trackList);
        console.log("The tracks are: " + tracks);
        let artistInfo = await getArtistInfo(token, artist_id);
        // check for the artist and update or insert
        const filter = {artist_id: artist_id};
        const images = artistInfo['images'][0];
        const genres = artistInfo['genres'];
        const update = {
            name: artistInfo['name'], 
            genres: artistInfo['genres'],
            followers: artistInfo['followers']['total'],
            image: {url: images['url'], height: images['height'], width: images['width']}
        };
        const artist = await Artist.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        });
        artist_id = artist._id;
        const newAlbum = new Album({title, cover, date, artist_id, tracks, album_id, genres});
        console.log("Album is being saved");
    
        newAlbum.save()

   })();
});

module.exports = router;