class InternalServiceError {
    constructor(param = 'Internal Service Error') {
        this.message = param.message || param;
        this.data = param.data;
        this.code = param.code;
    }
}

module.exports = InternalServiceError;