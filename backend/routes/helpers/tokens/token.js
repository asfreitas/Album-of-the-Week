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

class TokenGenerator {
    constructor() {
        console.log("making a new token generator");
        this.expireTime = null;
        this.token = null;
        this.generateNewToken();

    }

    async getToken() {
        if(this.isExpired()) {
            await this.generateNewToken();
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
        console.log("Generating new Token");
        let newExpiration = new Date();
        newExpiration = newExpiration.setSeconds(newExpiration.getSeconds() + newToken.expires_in);
        this.expireTime = newExpiration;
        this.token = newToken.access_token;
    }

}

module.exports = TokenGenerator;