class EmailAlreadyInUseError {
    constructor(param = 'Email Already In Use!') {
        this.message = param.message || param;
        this.data = param.data;
        this.code = param.code;
    }
}

module.exports = EmailAlreadyInUseError;