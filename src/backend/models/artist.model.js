const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artist_id: String,
    name: {
        type: String,
        required: true
        
    },
    genres: [mongoose.Schema.Types.String],
    albums: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Album'
    },
    image: {
        url: String,
        height: Number,
        width: Number
    },
    followersOld: Number,
    followersNew: Number


})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;