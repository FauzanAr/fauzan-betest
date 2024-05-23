const User = require('./domain');
const MongoDb = require('../../../../helpers/databases/mongodb/db');

const mongoDb = new MongoDb();
const user = new User(mongoDb);

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

module.exports = {
    getUser,
    login,
}