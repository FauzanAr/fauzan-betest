const HttpError = {
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,
    'NOT_FOUND': 404,
    'INTERNAL_SERVICE_ERROR': 500,
    'EMAIL_ALREADY_IN_USE': 4001,
};

const HttpSuccess = {
    'OK': 200,
    'CREATED': 201,
};

module.exports = {
    HttpError,
    HttpSuccess,
}