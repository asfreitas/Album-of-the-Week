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
class Tracks {
    static getTracksById() {
        return this.find();
    }
    static addTracks(request) {
        const tracks = request.tracks.items;
        const album_id = request.id;
        tracks.forEach(track => {
            const data = {
                track_id: track.id,
                name: track.name,
                length: track.duration_ms
    
            };
            const newTrack = this.create(data);
            return newTrack;
        });
    }
}
/*
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
*/

trackSchema.loadClass(Tracks);
const Track = mongoose.model('Track', trackSchema);

module.exports = Track;