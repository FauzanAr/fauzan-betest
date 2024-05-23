const { HttpError } = require("../utils/http_status_code");

class EmailAlreadyInUseError {
    constructor(param = 'Email Already In Use!') {
        this.message = param.message || param;
        this.data = param.data;
        this.code = HttpError.EMAIL_ALREADY_IN_USE;
    }
}

module.exports = EmailAlreadyInUseError;