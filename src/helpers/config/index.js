const dotenv = require('dotenv');

dotenv.config();

const config = {
    auth: {
        privateKey: process.env.PRIVATE_KEY,
    },
    mongodb: {
        url: process.env.MONGO_DB_URL,
        dbName: process.env.MONGO_DB_DATABASE,
    },
    redis: {
        url: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
    },
    port: process.env.PORT
}

module.exports = config;