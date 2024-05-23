const mongoConnection = require('./connection');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');

class DB {
    constructor() { };

    async findOne(collectionName, parameter) {
        const result = await mongoConnection.getConnection();
        if (result.err) {
            return result;
        }

        try {
            const connection = result.collection(collectionName);
            const record = await connection.findOne(parameter);
            if (!record) {
                return wrapper.error('Data not found!');
            }
            
            return wrapper.data(record);
        } catch (error) {
            logger.error(`FindOne Error ${error}`);
            return wrapper.error(`FindOne Error: ${error.message}`);
        }
    }

    async insertOne(collectionName, document) {
        const result = await mongoConnection.getConnection();
        if (result.err) {
            return result;
        }

        try {
            const connection = result.collection(collectionName);
            const record = await connection.insertOne(document);
            if (!record || !record.insertedId) {
                logger.error(`Error while insertOne: ${record}`);
                return wrapper.error('Failed insert data to database!');
            }
            
            return wrapper.data(record);
        } catch (error) {
            logger.error(`insertOne Error ${error}`);
            return wrapper.error(`insertOne Error: ${error.message}`);
        }
    }

    async updateOne(collectionName, parameter, document) {
        const updateDocument = {
            $set: document
        };
        const result = await mongoConnection.getConnection();
        if (result.err) {
            return result;
        }

        try {
            const connection = result.collection(collectionName);
            const record = await connection.updateOne(parameter, updateDocument);
            if (!record || !record.modifiedCount) {
                logger.error(`Error while updateOne: ${record}`);
                return wrapper.error('Failed insert data to database!');
            }
            
            return wrapper.data(record);
        } catch (error) {
            logger.error(`updateOne Error ${error}`);
            return wrapper.error(`updateOne Error: ${error.message}`);
        }
    }
}

module.exports = DB;