const fetch = require('node-fetch');
const env = require('../env');

const encoded = "Basic " + Buffer.from(env.SPOTIFY_CLIENT + ":" + env.SPOTIFY_SECRET).toString('base64');

let token = getToken();
let expiration = getToken();
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
        
    return response;
    }
    catch(err) {
        console.log("The error here is: " + err);
    }
}
async function getToken() {
    const token = req.headers['access_token'];
    
    const date = new Date().setSeconds(Date.now())
    if(JSON.parse(token) === undefined) {
        try {
            const newToken = await generateToken();
            if(!newToken.ok) {
                res.send("Could not get new Token");
            }
            const data = await newToken.json();
            res.locals.token = data['access_token'];
            res.locals.expires_in = data['expires_in'];
            next();
        }
        catch(err) {
            console.log(err);
        }
    }
    else {
        console.log("Reusing token");
        res.locals.token = token;
        res.locals.expires_in = undefined;
        next();

    }
  
  }
module.exports = {
    generateToken: generateToken,
    getToken: getToken
};