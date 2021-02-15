const router = require('express').Router();
//const fetch = require('node-fetch');
const generate = require('./generateToken');
const fetch = require('../tools/fetch');


// check for reusable token and create new one if necessary


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


router.route('/').get(generate.getToken, function(req, res, next){
    console.log(res.locals);
    const token = res.locals.token;
    const expires_in = res.locals.expires_in;

    let expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + expires_in);

    const query = req.query.q;
    // send the data
    const tokenAndExpiration = [token, expiration];
    (async () => {
        try {
            let albums = await searchSpotify(token, query);
            //console.log("The token at line 72 is " + token);
            //console.log(albums);
            const fullAlbum = [albums.albums.items, tokenAndExpiration];
            res.send(fullAlbum);
        }
        catch(error) { 
            console.log("The error is: " + error);
        }

    })();
    
});

module.exports = router;