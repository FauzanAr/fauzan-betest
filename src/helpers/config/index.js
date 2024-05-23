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
    port: process.env.PORT
}

module.exports = config;