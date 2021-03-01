const { response } = require('express');
const fetch = require('node-fetch');
const env = require('../env');

const encoded = "Basic " + Buffer.from(env.SPOTIFY_CLIENT + ":" + env.SPOTIFY_SECRET).toString('base64');

let token = '';
let expiration = undefined;
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
    let checkExp;
    let timeNow;
    if(expiration !== undefined) {
        checkExp = new Date().setSeconds(Date.now() + expiration);
        timeNow = new Date(Date.now());
    }
    if(token === '' || checkExp > timeNow) {
        const response = await generateToken();
        if(response.ok) {
            console.log("Response is ok")
            const newToken = await response.json();

            token = newToken.access_token;
            expiration = newToken.expires_in;
            console.log("Inside of get token:")
            console.log(token);
        }
    }
    return token;
    

  
  }
module.exports = {
    generateToken: generateToken,
    getToken: getToken
};