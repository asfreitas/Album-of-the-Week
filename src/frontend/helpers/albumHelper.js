import { getData, setHeaders } from './fetch';
import { isTokenExpired } from './searchHelper';

export function getTracks(query, token) {
    const keepToken = isTokenExpired(token) ? undefined: token[0];
    let headerDict = {
        'access_token': keepToken
    };
    const headers = setHeaders(headerDict);
    return getData(query, headers, 'GET');
}

export function insertAlbum(query, token, body) {
    const keepToken = isTokenExpired(token) ? undefined: token[0];
    let headerDict = {
        'access_token': keepToken,
        'Content-Type': 'application/json'
    };
    const headers = setHeaders(headerDict);
    return getData(query, headers, body, 'POST');
}

export function getBody(data) {

}