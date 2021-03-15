const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    track_id: String,
    name: String,
    length: Number,
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
});

trackSchema.statics.addTracks = function(request) {
    const tracks = request.tracks.items;
    const album_id = request.id;
    tracks.forEach(track => {
        const data = {
            track_id: track.id,
            name: track.name,
            length: track.duration_ms

        };
        const newTrack = new Track(data);
        newTrack.save();
    });
}

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;