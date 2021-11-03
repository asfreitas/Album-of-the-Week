const fetch = require('./fetch');
const Artist = require('../../models/artist.model');
const Track = require('../../models/track.model');
const Album = require('../../models/album.model');


function parseTracks(tracklist) {
    let tracksArray = [];
    for(let x = 0; x < tracklist.items.length; x++) {
        let nextTrack = tracklist.items[x];
        let track = {
            name: nextTrack['name'],
            length: nextTrack['duration_ms'],
            track_id: nextTrack['id'],
            sample: nextTrack['preview_url'],
            popularity: nextTrack['popularity']
            
        }
        tracksArray.push(track);
    }
    return tracksArray;
}

function setupAlbum(album) {
    const isAlbum = JSON.parse(album['isAlbumOfTheWeek']);
    album['isAlbumOfTheWeek'] = isAlbum; // convert to true/false
    const date = new Date(album['date']);// convert to date object
    album['date'] = date;
    return album;
}


async function getTracks(token, id) {
    const authorize = "Bearer " + token;
    const headers =  {
        'Authorization': authorize,
        'Content-Type': 'application/json'
    };
    const url = 'https://api.spotify.com/v1/albums/';
    const searchQuery = url + id + '/tracks';
    let body = fetch.getData(searchQuery, headers, undefined, 'GET');

    return body;
}
async function createNewTracks(trackList) {
    let trackIds = [];
    for(let x = 0; x < trackList.length; x++) {
        let track = new Track(trackList[x]); // create the new album now
        let myTrack = await track.save()
        let track_id = myTrack._id;
        trackIds.push(track_id);
    }
    return trackIds;
}

async function getArtistInfo(token, id) {
    const authorize = "Bearer " + token;
    const headers =  {
        'Authorization': authorize,
        'Content-Type': 'application/json'
    };
    const url = 'https://api.spotify.com/v1/artists/';
    const searchQuery = url + id;
    let body = fetch.getData(searchQuery, headers, undefined, 'GET');

    return body;
}

async function updateArtist(artistInfo, artist_id) {
    const images = artistInfo['images'][0];
    const filter = {artist_id: artist_id};
    const update = {
        name: artistInfo['name'], 
        genres: artistInfo['genres'],
        followers: artistInfo['followers']['total'],
        image: {url: images['url'], height: images['height'], width: images['width']}
    };
    const artist = await Artist.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
    });
    return artist;
}

async function createAlbum(album, artist, user, tracks) {
    album.save()
    .then(doc => {
        user.albums.push(doc._id);
        artist.albums.push(doc._id);
        artist.save();
        user.save();

        return doc.album_id;
    });
}
async function changeWeeklyAlbum() {
    const filter = {isAlbumOfTheWeek: true};
    const oldWeeklyAlbum = await Album.getAlbum(filter);
    console.log('the old weekly album is....\n\n' + oldWeeklyAlbum);
    if(oldWeeklyAlbum)
    {
        oldWeeklyAlbum.isAlbumOfTheWeek = false;
        oldWeeklyAlbum.save();
    }
}

module.exports = {
    parseTracks: parseTracks,
    setupAlbum: setupAlbum,
    getArtistInfo: getArtistInfo,
    createAlbum: createAlbum,
    updateArtist: updateArtist,
    getTracks: getTracks,
    createNewTracks: createNewTracks,
    changeWeeklyAlbum: changeWeeklyAlbum
}