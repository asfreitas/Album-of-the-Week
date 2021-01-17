const fetch = require('node-fetch');
const env = require('../env');

const encoded = "Basic " + Buffer.from(env.SPOTIFY_CLIENT + ":" + env.SPOTIFY_SECRET).toString('base64');

const spotify_credentials = {
    body:'grant_type=client_credentials',
    header: {
        'Authorization':encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

async function generateToken() {
    let response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization':encoded,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    let body = response.json();
    return body;
}

module.exports.generateToken = generateToken;