const { response } = require('express');
const fetch = require('node-fetch');
const env = require('../../../env');

const encoded = "Basic " + Buffer.from(env.SPOTIFY_CLIENT + ":" + env.SPOTIFY_SECRET).toString('base64');
const token_payload = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
        'Authorization': encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

let token = '';
let expiration = undefined;

async function generateToken() {
    let response;
    try {
        response = await fetch('https://accounts.spotify.com/api/token', token_payload );  
    }
    catch(err) {
        console.log("There was a problem generating a new token: " + err);
    }
    return response;

}
async function getToken() {
    let timeNow = Date.now();
    console.log(typeof timeNow);
    console.log(expiration - timeNow)
    console.log(typeof expiration);
    if(timeNow > expiration) {
        await tokenSetup();
    }
    return token;
}
async function tokenSetup() {
    const response = await generateToken();
    if(response.ok) {
        console.log("Response is ok")
        const newToken = await response.json();

        setToken(newToken);
        console.log(token);
    }
}

function setToken(newToken) {
    token = newToken.access_token;
    let newExpiration = new Date();
    newExpiration = newExpiration.setSeconds(newExpiration.getSeconds() + newToken.expires_in)
    expiration = newExpiration;
}
module.exports = {
    generateToken: generateToken,
    getToken: getToken,
    tokenSetup: tokenSetup
};