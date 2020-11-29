const router = require('express').Router();
let Album = require('../models/album.model');

router.route('/').get((req, res) => {
    Album.find()
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req,res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const songs = req.body.songs;
    const cover = req.body.cover;
    const date = req.body.date;
    const genre = req.body.genre;

    const newAlbum = new Album({title, artist, songs, cover, date, genre});
    newAlbum.save()
    .then(() => res.json("Album Added!"));

});

module.exports = router;