 import { getData } from './fetch'



 export function getAlbums(query, token) {
    console.log(token);
    const keepToken = isTokenExpired(token) ? undefined :  token[0];
    console.log(keepToken);
    let headerDict = {
        'access_token': keepToken
    };

    return getData(query, headerDict, undefined, 'GET');

 }
 // make sure that 
 export function generateAlbum(fullAlbums) {
        const info = fullAlbums[0];
        let albums = [];
        for(let j=0; j < fullAlbums[0].length; j++)
        {
            let artwork = info[j]['images'][0]; 
            let artist = info[j]['artists'][0];
            
            let album = {
                cover: artwork['url'],
                height: artwork['height'],
                width: artwork['width'],
                artist_id: artist,
                title: info[j]['name'],
                tracks: undefined,
                artist: artist['name'],
                date: new Date(info[j]['release_date']),
                album_id: info[j]['id']
            }

            albums.push(album);
        }
        /*
        let tracksArray = [];
        for(var i = 0; i < tracks.items.length; i++) {
            tracksArray.push(tracks.items[i].name);
        }
        album.tracks = tracksArray;

        console.log(album.tracks);
        */
        return albums;

    }

// check if a new token is needed
export function isTokenExpired(myToken) {
    if(myToken === 'undefined' || myToken === undefined) {return true;}
    const token = myToken[0];
    const time = new Date(myToken[1]);
    const currentTime = new Date();

    if(time < currentTime || token === undefined) {
        console.log("The token is expired");
        return true;
    }
    console.log("The token is not expired");

    return false;
}