let jwt = require('jsonwebtoken');
let uuid4 = require('uuid4');

require('dotenv').config();

class TokenService {
    static #app_access_key = '6721d5fe33ce74ab9be94543';
    static #app_secret = 'iNbPmFwJT0ufEyvbedh8PuUjytGV6Hc3E5SuwJqB-m-raghJ4XZRn0drzNiBpkcD8o5nyLu8Sl0aTUYbMxa9G0qeR2sn4YJeoklx9AhLwR3WPhCMDh35QkDFOAlpgkNVvGAbFJEO1CCqdv-KB4He_85R5_Ywg0xUkw4srq7O5ck';
    #managementToken;
    constructor(){
        this.#managementToken = this.getManagementToken(true);
    }

    #signPayloadToToken(payload) {
        if (!TokenService.#app_secret) {
            throw new Error("App secret is not defined or empty!");
        }
    
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

//module.exports = {TokenService};

export default TokenService;