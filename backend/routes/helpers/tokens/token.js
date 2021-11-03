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
        let response;
        try {
            response = await fetch('https://accounts.spotify.com/api/token', token_payload );  
        }
        catch(err) {
            console.log("There was a problem generating a new token: " + err);
        }
        let newToken = await response.json();

        let newExpiration = new Date();
        newExpiration = newExpiration.setSeconds(newExpiration.getSeconds() + newToken.expires_in);
        this.expireTime = newExpiration;
        this.token = newToken.access_token;
    }

}

module.exports = TokenGenerator;