const fetch = require('node-fetch');
const env = require('../env');

const encoded = "Basic " + Buffer.from(env.SPOTIFY_CLIENT + ":" + env.SPOTIFY_SECRET).toString('base64');

const spotify_credentials = {
    body:'grant_type=client_credentials',
    header: {
        'Authorization': encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

async function generateToken() {
    try{
       const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': encoded,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
    const body = response.json();
    return body;
    }
    catch(err) {
        console.log("The error here is: " + err);
    }
}
function getToken(req, res, next) {
    const token = req.headers['access_token'];
  
    if(token === 'undefined' || token === undefined) {
        generateToken()
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
module.exports = {
    generateToken: generateToken,
    getToken: getToken
};