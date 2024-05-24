const UserQuery = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const hash = require('../../../../helpers/utils/hash');
const auth = require('../../../../helpers/auth/jwt/middleware');
const { NotFoundError, BadRequestError } = require('../../../../helpers/error');

class User {
    constructor(mongoDb, redis) {
        this.userQuery = new UserQuery(mongoDb, redis);
    }

    async getUser(payload) {
        const result = await this.userQuery.getUser(payload);
        if (!result || result.err || !result.data) {
            return wrapper.error(new NotFoundError('No existing user!'));
        }

        return wrapper.data(result.data);
    }

    async getUserByAccount(payload) {
        if (!payload.accountNumber) {
            return wrapper.error(new BadRequestError('Account number not found!'));
        }

        const result = await this.userQuery.getUserByAccountNumber(Number(payload.accountNumber));
        if (!result || result.err || !result.data) {
            return wrapper.error(new NotFoundError('No existing user!'));
        }

        return wrapper.data(result.data);
    }

    async login(payload){
        const query = {
            emailAddress: payload.email
        }
        const user = await this.userQuery.getUser(query);
        if (!user || user.err || !user.data) {
            return wrapper.error(new NotFoundError('No existing user!'));
        }

        const comparedPassword = await hash.comparePassword(payload.password, user.data.password);
        if (comparedPassword && !comparedPassword.data) {
            return wrapper.error(new BadRequestError('Password missmatch!'));
        }

        const tokenPayload = {
            userData: {
                userName: user.data.userName,
                emailAddress: user.data.emailAddress,
                accountNumber: user.data.accountNumber,
                identityNumber: user.data.identityNumber,
            }
        }
        const token = auth.generateToken(tokenPayload);
        return wrapper.data(token);
    }
}

module.exports = User