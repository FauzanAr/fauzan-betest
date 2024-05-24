const User = require('./domain');
const MongoDb = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/databases/redis/db');

const mongoDb = new MongoDb();
const redis = new Redis();
const user = new User(mongoDb, redis);

const getUser = async (payload) => {
    const getData = async () => {
        return await user.getUser(payload);
    };
    const result = await getData();
    return result;
};

const login = async (payload) => {
    const getData = async () => {
        return await user.login(payload);
    };
    const result = await getData();
    return result;
}

const getUserByAccount = async (payload) => {
    const getData = async () => {
        return await user.getUserByAccount(payload);
    };
    const result = await getData();
    return result;
}

module.exports = {
    getUser,
    login,
    getUserByAccount,
}