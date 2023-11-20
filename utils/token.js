const jwt = require('jsonwebtoken');
const fs = require('fs');

// We use UTF-8 to get string value of the keys.
var privateKey = fs.readFileSync('./configs/keys/dev.key', 'utf-8');
var publicKey = fs.readFileSync('./configs/keys/dev.key.pub', 'utf-8');

exports.createJwtToken = (payload) => {
    const jwtOptions = {
        algorithm: "RS256",
        subject: `${payload.userId}`,
        expiresIn: "10d",
        jwtid: `${(Math.floor(Date.now()))}`
    };

    const token = jwt.sign(payload, privateKey, jwtOptions);

    return token;
}

exports.verifyJwtToken = (token, next) => {
    try {
        const verifiedToken = jwt.verify(token, publicKey);

        return verifiedToken.userId;
    } catch (e) {
        next(e);
    }
}