const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
    artist_id: String,
    name: {
        type: String,
        required: true
    },
    genres: [mongoose.Schema.Types.String],
    albums: {
        type: [String],
        ref: 'Album'
    },
})
artistSchema.virtual('album_ids', {
    ref: 'Album',
    localField: 'albums',
    foreignField: 'album_id'
});

artistSchema.statics.addArtist = async function(artist, album_id) {
    const data = {
        genres: artist.genres,
        artist_id: artist.id,
        name: artist.name,
        albums: album_id

    }
    const filter = {artist_id: artist.id};
    const newArtist = await Artist.findOneAndUpdate(filter, data, {
        new: true,
        upsert: true
    });
    newArtist.save();

}


const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;