import { getData, postData } from './fetch';
import { isTokenExpired } from './searchHelper';


export function insertAlbum(query, token, body) {
    console.log(body);
    const keepToken = isTokenExpired(token) ? undefined: token[0];
    let headerDict = {
        'access_token': keepToken,
        'content': 'form'
    };
    return postData(query, headerDict, body);
}
