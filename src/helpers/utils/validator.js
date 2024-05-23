const joi = require('joi');
const { BadRequestError } = require('../error');
const wrapper = require('./wrapper');

const isValidPayload = (payload, constraint) => {
    const { error, value } = constraint.validate(payload);
    if(error) {
        let message = error.details[0].message;
        return wrapper.error(new BadRequestError(message));
    }
    return wrapper.data(value, 'success', 200);
};

module.exports = {
    isValidPayload
};