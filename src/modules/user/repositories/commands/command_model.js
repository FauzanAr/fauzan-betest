const joi = require('joi');

const xssPattern = new RegExp(/[\'\"\<\>\=\&\\]/);
const createUser = joi.object({
    userName: joi.string().pattern(xssPattern, { name: 'userName', invert: true }).required(),
    accountNumber: joi.number().required(),
    emailAddress: joi.string().email().required(),
    identityNumber: joi.number().required(),
    password: joi.string().min(6).required(),
});

const updateUserPasswrod = joi.object({
    password: joi.string().min(6).required(),
    email: joi.string().email().required(),
});

const updateUserEmail = joi.object({
    oldEmail: joi.string().email().required(),
    newEmail: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

const updateUser = joi.object({
    email: joi.string().email().required(),
    userName: joi.string().pattern(xssPattern, { name: 'userName', invert: true }).optional(),
    accountNumber: joi.number().optional(),
    identityNumber: joi.number().optional(),
}).or('userName', 'accountNumber', 'identityNumber');

const deleteUser = joi.object({
    email: joi.string().email().required(),
});

module.exports = {
    createUser,
    updateUserPasswrod,
    updateUserEmail,
    updateUser,
    deleteUser,
}