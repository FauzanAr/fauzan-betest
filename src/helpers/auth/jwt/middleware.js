const jwt = require('jsonwebtoken');
const config = require('../../config');
const wrapper = require('../../utils/wrapper');
const { UnauthorizedError } = require('../../error');

const verifyAuth = (req, res, next) => {
    const key = config.auth.privateKey;
    const auth = req?.headers?.authorization;
    if (!auth) {
        const response = wrapper.error(new UnauthorizedError('Authorization not found!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }
    const token = auth.split(' ')[1];
    if (!token) {
        const response = wrapper.error(new UnauthorizedError('Invalid Authorization token!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
        const response = wrapper.error(new UnauthorizedError('Failed to verify token!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    req.user = decodedToken.userData;
    next();
};

const generateToken = (payload) => {
    const expiresIn = 24 * 60 * 60;
    const key = config.auth.privateKey;
    const token = jwt.sign(payload, key, {expiresIn})
    return token;
};

module.exports = {
    verifyAuth,
    generateToken,
}