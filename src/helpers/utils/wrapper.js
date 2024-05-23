const ERROR = require('../error');
const status = require('./http_status_code');

const data = (data) => ({ err: null, data });
const error = (error) => ({ err: error, data: null });
const response = (res, type, result, message = '', responseCode = 200) => {
    let status = true;
    let data = result.data;
    let code = responseCode;
    if (type === 'fail') {
        const errCode = checkErrorCode(result.err);
        status = false;
        data = result.err.data || '';
        message = result.err.message || message;
        code = result.err.code || errCode ;
        responseCode = errCode;
    };

    res.status(responseCode).send({
        success: status,
        data,
        message,
        code
    });
};
const checkErrorCode = (error) => {
    switch (error.constructor) {
        case ERROR.BadRequestError:
            return status.HttpError.BAD_REQUEST;
        case ERROR.NotFoundError:
            return status.HttpError.NOT_FOUND;
        case ERROR.InternalServiceError:
            return status.HttpError.INTERNAL_SERVICE_ERROR;
        case ERROR.EmailAlreadyInUseError:
            return status.HttpError.EMAIL_ALREADY_IN_USE;
        case ERROR.UnauthorizedError:
            return status.HttpError.UNAUTHORIZED;
        default:
            return status.HttpError.INTERNAL_SERVICE_ERROR;
    }
}

module.exports = {
    data,
    error,
    response,
    checkErrorCode,
}