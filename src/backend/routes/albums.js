const router = require('express').Router();
let Album = require('../models/album.model');

router.route('/').get((req, res) => {
    Album.find()
    .then(albums => res.json(albums))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;