const router = require('express').Router();
const Album = require('../models/album.model');
const User = require('../models/user.model');
const Rating = require('../models/rating.model');


router.route('/addRating').post(function(req, res) {
    const data = req.body;

    if (data.username === 'guest') {
        return;
    }
    
    Rating.addRating(data['username'],data['album_id'], data['rating']);
});

router.route('/updateRating').put(function(req,res) {
    const data = req.body;

    if (data.username === 'guest') {
        return;
    }
    
    Rating.updateRating(data['rating'], data['_id']);
});

module.exports = router;