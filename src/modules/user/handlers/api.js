const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');

const getUser = async (req, res) => {
    const payload = {
        emailAddress: req.user.emailAddress
    };
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Get User Success');
    };
    sendResponse(await queryHandler.getUser(payload));
};

const updateUser = async (req, res) => {
    const payload = {
        ...req.body,
        email: req.user.emailAddress,
    };
    const validatedPayload = validator.isValidPayload(payload, commandModel.updateUser);
    const updateData = async (result) => {
        if (result.err) {
            return result;
        }

        return await commandHandler.updateUser(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Update User Success');
    };
    sendResponse(await updateData(validatedPayload));
};

const deleteUser = async (req, res) => {
    const payload = {
        email: req.user.emailAddress,
    };
    const validatedPayload = validator.isValidPayload(payload, commandModel.deleteUser);
    const createData = async (result) => {
        if (result.err) {
            return result;
        }

        return await commandHandler.deleteUser(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Delete User Success');
    };
    sendResponse(await createData(validatedPayload));
}

const createUser = async (req, res) => {
    const payload = req.body;
    const validatedPayload = validator.isValidPayload(payload, commandModel.createUser);
    const createData = async (result) => {
        if (result.err) {
            return result;
        }

        return await commandHandler.createUser(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Create User Success');
    };
    sendResponse(await createData(validatedPayload));
}

const updateEmailUser = async (req, res) => {
    const payload = {
        ...req.body,
        oldEmail: req.user.emailAddress
    };
    const validatedPayload = validator.isValidPayload(payload, commandModel.updateUserEmail);
    const updateData = async (result) => {
        if (result.err) {
            return result;
        }

        return await commandHandler.updateEmail(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Update Email Success');
    };
    sendResponse(await updateData(validatedPayload));
}

const updatePasswordUser = async (req, res) => {
    const payload = {
        ...req.body,
        email: req.user.emailAddress,
    };
    const validatedPayload = validator.isValidPayload(payload, commandModel.updateUserPasswrod);
    const updateData = async (result) => {
        if (result.err) {
            return result;
        }

        return await commandHandler.updatePassword(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Update Password Success');
    };
    sendResponse(await updateData(validatedPayload));
}

const login = async (req, res) => {
    const payload = req.body;
    const validatedPayload = validator.isValidPayload(payload, queryModel.login);
    const getData = async (result) => {
        if (result.err) {
            return result;
        }

        return await queryHandler.login(payload);
    }
    const sendResponse = async (result) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Login Success');
    };
    sendResponse(await getData(validatedPayload));
}

module.exports = {
    getUser,
    createUser,
    updateEmailUser,
    updatePasswordUser,
    updateUser,
    login,
    deleteUser,
}