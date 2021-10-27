const fetch = require('node-fetch');
const dotenv = require('dotenv');
const config = dotenv.config();

const encoded = "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT + ":" + process.env.SPOTIFY_SECRET).toString('base64');

const token_payload = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
        'Authorization': encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

class TokenGenerator {
    constructor() {
        console.log("making a new token generator");
        this.expireTime = null;
        this.token = null;
        this.generateNewToken();
    }

    getToken() {
        if(this.isExpired()) {
            this.generateNewToken();
        }
        return this.token;
    }

    getExpireTime() {
        return this.expireTime;
    }

    isExpired() {
        let expired = false;
        const timeNow = Date.now();
        if(timeNow > this.expireTime) {
            expired = true;
        }
        return expired;
    }

    async generateNewToken() {
        console.log("Spotify client:" + process.env.SPOTIFY_CLIENT)
        let response;
        try {
            response = await fetch('https://accounts.spotify.com/api/token', token_payload );  
        }
        catch(err) {
            console.log("There was a problem generating a new token: " + err);
        }
        let newToken = await response.json();

        console.log("New token: " + newToken);
        console.log("Generating new Token");
        for(const property in newToken) {
            console.log(`${property}: ${newToken[property]}`);
        }
        let newExpiration = new Date();
        newExpiration = newExpiration.setSeconds(newExpiration.getSeconds() + newToken.expires_in);
        this.expireTime = newExpiration;
        this.token = newToken.access_token;
        console.log(this.token);
    }

}

module.exports = TokenGenerator;