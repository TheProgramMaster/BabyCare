let jwt = require('jsonwebtoken');
let uuid4 = require('uuid4');

class TokenService {
    static #app_access_key = process.env.HMS_APP_ACCESS_KEY;
    static #app_secret = process.env.HMS_APP_SECRET;
    #managementToken;
    constructor(){
        this.#managementToken = this.getManagementToken(true);
    }

    #signPayloadToToken(payload){
        let token = jwt.sign(
            payload,
            TokenService.#app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '24h',
                jwtid: uuid4()
            }
        );
        return token;
    }
    #isTokenExpired(token){
        try{
            const { exp } = jwt.decode(token);
            const buffer = 30;
            const currTimeSeconds = Math.floor(Date.now() / 1000);
            return !exp || exp + buffer < currTimeSeconds;
        } catch(err) {
            console.log("error in decoding token", err);
            return true;
        }
    }

    getManagementToken(forceNew) {
        if (forceNew || this.#isTokenExpired(this.#managementToken)) {
            let payload = {
                access_key: TokenService.#app_access_key,
                type: 'management',
                version: 2,
                iat: Math.floor(Date.now() / 1000),
                nbf: Math.floor(Date.now() / 1000)
            };
            this.#managementToken = this.#signPayloadToToken(payload);
        }
        return this.#managementToken;
    }

    getAuthToken({ room_id, user_id, role }){
        let payload = {
            access_key: TokenService.#app_access_key,
            room_id: room_id,
            user_id: user_id,
            role: 'guest',
            type: 'app',
            version: 2,
            iat: Math.floor(Date.now() / 1000),
            nbf: Math.floor(Date.now() / 1000)
        };
        console.log("Payload for JWT:", payload);
        const token = this.#signPayloadToToken(payload);
        console.log("Generated JWT:", token);
        return token;
        //return this.#signPayloadToToken(payload);
    }
}

module.exports = {TokenService};