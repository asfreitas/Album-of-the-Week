const router = require('express').Router();
const fetch = require('./helpers/fetch');
const TokenGenerator = require('./helpers/tokens/token');

// check for reusable token and create new one if necessary

const tokenGenerator = new TokenGenerator();
// search for albums
function searchSpotify(token, query) {
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


router.route('/').get(async function(req, res, next){
    const token = tokenGenerator.getToken();

    const query = req.query.q;

    try {
        let albums = await searchSpotify(token, query);
        const fullAlbum = [albums.albums.items];
        res.send(fullAlbum);
    }
    catch(error) { 
        console.log("The error is: " + error);
    }
});

module.exports = router;