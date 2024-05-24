const redisConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
const { InternalServiceError, BadRequestError } = require('../../error');

class DB {
    constructor() { }

    async getData(key) {
        const connection = await redisConnection.getConnection();
        if (!connection || connection.err) {
            return wrapper.error(new InternalServiceError('Redis connection error!'));
        }

        try {
            let result = await connection.get(key);
            if (result) {
                result = JSON.parse(result).data;
            }
            return wrapper.data(result);
        } catch (error) {
            logger.error(`Error while getData from redis ${error}`);
            return wrapper.error(new InternalServiceError('Error getData from redis!'));
        }
    };

    async setData(key, data, exp = 1 * 60 * 60) {
        const connection = await redisConnection.getConnection();
        if (!connection || connection.err) {
            return wrapper.error(new InternalServiceError('Redis connection error!'));
        }

        if (!data) {
            logger.error(`Nullable data ${data}`);
            return wrapper.error(new BadRequestError('Data null!'));
        }

        try {
            const document = {
                data: data
            }
            const value = JSON.stringify(document);
            const result = await connection.set(key, value, 'EX', exp);
            return wrapper.data(result);
        } catch (error) {
            logger.error(`Error while getData from redis ${error}`);
            return wrapper.error(new InternalServiceError('Error getData from redis!'));
        }
    }
};

module.exports = DB;