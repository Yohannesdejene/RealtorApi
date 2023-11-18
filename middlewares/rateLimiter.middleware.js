const Redis = require('ioredis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

const redisClient = new Redis({
    connectTimeout: 10000,
    enableOfflineQueue: false,
});

const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    inmemoryBlockOnConsumed: 200,
    inmemoryBlockDuration: 30,
    points: 10,
    duration: 1,
});

exports.rateLimiterMiddleware = (req, res, next) => {
    rateLimiterRedis.consume(req.ip).then(() => {
            next();
        })
        .catch(_ => {
            res.status(429).send('Too many requests');
        });
};