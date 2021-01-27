const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: [mongoose.Schema.Types.String],
    albums: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    image: {
        url: String,
        height: Number,
        width: Number
    }

})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;