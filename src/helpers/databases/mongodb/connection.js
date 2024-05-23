const { MongoClient } = require('mongodb');
const logger = require('../../utils/logger');
const wrapper = require('../../utils/wrapper');
const config = require('../../config');

let connectionPool = null;
const url = config.mongodb.url;
const dbName = config.mongodb.dbName;
const createConnection = async () => {
    const options = {
        maxPoolSize: 20,
        minPoolSize: 10,
        connectTimeoutMS: 15000,
        maxIdleTimeMS: 15000,
    };

    try {
        const connection = await MongoClient.connect(url, options);
        connectionPool = connection.db(dbName);
    } catch (error) {
        logger.error(`Mongodb connection error: ${error}`);
        return wrapper.error(error.message);
    }
};

const getConnection = async () => {
    if (connectionPool) {
        return connectionPool;
    }

    await createConnection();
};

const init = async () => {
    await createConnection();
};

module.exports = {
    init,
    getConnection,
}