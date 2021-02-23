import { getData, postData } from './fetch';
import { isTokenExpired } from './searchHelper';

export function getTracks(albumId, token) {
    const query = '	https://api.spotify.com/v1/albums/' + albumId + '/tracks/';
    const keepToken = isTokenExpired(token) ? undefined: token[0];
    const headers = {
        'access_token': keepToken,
        'content': 'form'
    };
    return getData(query, headers);
}

export function insertAlbum(query, token, body) {
    console.log(body);
    const keepToken = isTokenExpired(token) ? undefined: token[0];
    let headerDict = {
        'access_token': keepToken,
        'content': 'form'
    };
    return postData(query, headerDict, body);
}
