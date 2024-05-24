const Redis = require('ioredis');
const logger = require('../../utils/logger');
const config = require('../../config');
const wrapper = require('../../utils/wrapper');
const { InternalServiceError } = require('../../error');

let connection = null;
const url = config.redis.url;
const port = config.redis.port;

const createConnection = async () => {
    try { 
        connection = new Redis({
            host: url,
            port: port
        });
    } catch (error) {
        logger.error(`Error while connectiong to redis ${error}`);
        return wrapper.error(new InternalServiceError('Error redis connection'));
    }
}

const getConnection = async () => {
    if (!connection) {
        connection = await createConnection();
    }

    return connection;
}

const init = async () => {
    await createConnection()
};

module.exports = {
    init,
    getConnection,
}