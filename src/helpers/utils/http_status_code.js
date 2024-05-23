const HttpError = {
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404,
    'INTERNAL_SERVICE_ERROR': 500,
};

const HttpSuccess = {
    'OK': 200,
    'CREATED': 201,
};

module.exports = {
    HttpError,
    HttpSuccess,
}