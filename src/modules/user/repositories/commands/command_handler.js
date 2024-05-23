const User = require('./domain');
const MongoDB = require('../../../../helpers/databases/mongodb/db');

const mongoDb = new MongoDB();
const user = new User(mongoDb);

const createUser = async (payload) => {
    const createData = async () => {
        return await user.createUser(payload);
    };
    const result = await createData();
    return result;
};

const updateEmail = async (payload) => {
    const updateData = async () => {
        return await user.updateEmail(payload);
    };
    const result = await updateData();
    return result;
};

const updatePassword = async (payload) => {
    const updateData = async () => {
        return await user.updatePassword(payload);
    };
    const result = await updateData();
    return result;
};

const updateUser = async (payload) => {
    const updateData = async () => {
        return await user.updateUser(payload);
    };
    const result = await updateData();
    return result;
};

const deleteUser = async (payload) => {
    const updateData = async () => {
        return await user.deleteUser(payload);
    };
    const result = await updateData();
    return result;
}

module.exports = {
    createUser,
    updateEmail,
    updatePassword,
    updateUser,
    deleteUser,
}