const router = require('express').Router();
//const fetch = require('node-fetch');
const generate = require('./generateToken');
const env = require('../env');
const fetch = require('../tools/fetch');

// check for reusable token and create new one if necessary
function getToken(req, res, next) {
    const token = req.headers['access_token'];
    console.log(req.headers);
    console.log("The token at line 10 is: " + token);
    if(token === 'undefined' || token === undefined) {
        generate.generateToken()
        .then(result => {
            console.log("Creating new token");
            res.locals.token = result['access_token'];
            res.locals.expires_in = result['expires_in'];
            if(result){
                next();
            }
            else{
                res.send("Could not get new token");
            }
        });
    }
    else {
        console.log("Reusing token");
        res.locals.token = token;
        res.locals.expires_in = undefined;
        next();
        /*

        */
    }

}

// search for albums
async function searchSpotify(token, query) {
    const authorize = "Bearer " + token;

    const headers =  {
        'Authorization': authorize,
        'Content-Type': 'application/json'
    };
    const url = 'https://api.spotify.com/v1/search?';
    let searchQuery = url + 'q=' + query + '&type=album';
    let body = fetch.getData(searchQuery, headers, undefined, 'GET')

    return body;
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

router.route('/').get(getToken, function(req, res, next){
    console.log(res.locals);
    const token = res.locals.token;
    const expires_in = res.locals.expires_in;

    let expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + expires_in);

    const query = req.query.q;
    // send the data
    const tokenAndExpiration = [token, expiration];
    (async () => {
        let albums = await searchSpotify(token, query);
        console.log("The token at line 72 is " + token);
        let tracks = await getTracks(token, albums.albums.items[0].id);
        const fullAlbum = [albums.albums.items, tracks, tokenAndExpiration];
        res.send(fullAlbum)
    })();
    
});

module.exports = router;
/*




async function generateToken() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: spotify_credentials['body'],
        headers: spotify_credentials['header']
    });
    let token = await response.json();
    return token;

    generateToken().then(token => {
        console.log("MONGO_URI" + env.MONGO_URI)
        console.log(token);
        fetch("https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V", {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token['access_token'],
            }
        }).then(response => response.json())
        .then(data => console.log(data));
    });
        next();
    }

    let myToken = '';
    let generateToken = async function() {
        let token = generate.generateToken();
        return token;
    };

generateToken().then(token => {
    console.log(token);
    fetch("https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token['access_token'],
        }
    }).then(response => response.json())
    .then(data => console.log(data));
});
*/