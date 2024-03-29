const mongoose = require('mongoose');
const Album = require('./album.model');
const User = require('./user.model');
const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    rating: {
        type: Number,
        default:0
    }
});


ratingSchema.statics.addRating = async function(username, album, rating) {
    const albumName = await Album.findOne({album_id: album});
    const userName = await User.findOne({username: username});
    const albumId = albumName._id;
    const userId = userName._id;

    // do the update
    const oldRating = {album: albumId, user:userId};
    const update = {rating: rating};
    const updateRating = await Rating.findOneAndUpdate(oldRating, update, {
        new: true,
        upsert: true
    }).exec();
    albumName.ratings.addToSet(updateRating._id);
    albumName.save();
};
ratingSchema.statics.updateRating = async function(newRating, _id) {
    console.log(_id);
    const getRating = await Rating.findById(mongoose.Types.ObjectId(_id)).exec();
    getRating.rating = newRating;
    getRating.save();
}

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;