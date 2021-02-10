const router = require('express').Router();
const Album = require('../models/album.model');
const User = require('../models/user.model');
const Rating = require('../models/rating.model');


router.route('/addRating').post(function(req, res) {

    const ratings = Rating.addRating('Andrew','5B4PYA7wNN4WdEXdIJu58a', 3.5);
});

router.route('/updateRating').put(function(req,res) {



});

module.exports = router; 