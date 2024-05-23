class UnauthorizedError {
    constructor(param = 'Unauthorized Error!') {
        this.message = param.message || param;
        this.data = param.data;
        this.code = param.code;
    }
}

module.exports = UnauthorizedError;