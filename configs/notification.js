const admin = require('firebase-admin');
const serviceAccount = require('./mamapays-da739-firebase-adminsdk-z3v2q-02561c5d3c.json');
const { logger } = require('./logger');

module.exports = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
    logger.log({ message: 'Firebase SDK initialized', level: 'info' });
}