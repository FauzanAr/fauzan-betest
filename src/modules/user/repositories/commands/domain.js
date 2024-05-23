const UserCommand = require('./command');
const UserQuery = require('../queries/query_handler');
const wrapper = require('../../../../helpers/utils/wrapper');
const entity = require('../../user');
const hash = require('../../../../helpers/utils/hash');
const { BadRequestError, InternalServiceError, NotFoundError, EmailAlreadyInUseError } = require('../../../../helpers/error');

class User {
    constructor(mongoDb) {
        this.userCommand = new UserCommand(mongoDb);
        this.userQuery = UserQuery;
    }

    async createUser(payload) {
        const password = await hash.hashPassword(payload.password);
        if (password.err) {
            return wrapper.error(new InternalServiceError('Error while hashing password'));
        }

        const query = {
            email: payload.email
        };
        const bookedEmail = await this.userQuery.getUser(query);
        if (bookedEmail.data) {
            return wrapper.error(new EmailAlreadyInUseError());
        }

        const user = entity.User();
        user.userName = payload.userName;
        user.accountNumber = payload.accountNumber;
        user.identityNumber = payload.identityNumber;
        user.emailAddress = payload.emailAddress;
        user.password = password.data;

        const result = await this.userCommand.createUser(user);
        if (result.err) {
            return wrapper.error(new BadRequestError('Error while inserting data!'));
        }

        delete user.password;
        delete user.id;
        delete user._id;
        return wrapper.data(user);
    }

    async updateUser(payload) {
        const query = {
            emailAddress: payload.emailAddress
        }
        const currentUser = await this.userQuery.getUser(query);
        if (!currentUser || currentUser.err) {
            return wrapper.error(new NotFoundError('No user exist!'));
        }

        const comparedPassword = await hash.comparePassword(payload.password, currentUser.data.password);
        if (comparedPassword && !comparedPassword.data) {
            return wrapper.error(new BadRequestError('Password missmatch!'));
        }

        const updateDocument = {
            userName: payload.userName ? payload.userName : currentUser.data.userName,
            accountNumber: payload.accountNumber ? payload.accountNumber : currentUser.data.accountNumber,
            identityNumber: payload.identityNumber ? payload.identityNumber : currentUser.data.identityNumber
        };
        const result = await this.userCommand.updateUser(query, updateDocument);
        if (result.err) {
            return wrapper.error(new BadRequestError('Error while updating user!'));
        }

        return wrapper.data('Success update user!');
    }

    async updateEmail(payload) {
        const query = {
            emailAddress: payload.oldEmail
        };
        const queryDuplicate = {
            emailAddress: payload.newEmail
        };
        const [currentUser, duplicateUser] = await Promise.all([
            this.userQuery.getUser(query),
            this.userQuery.getUser(queryDuplicate),
        ]);
        if (!currentUser || !currentUser.data || currentUser.err) {
            return wrapper.error(new NotFoundError('No user exist!'));
        }

        const comparedPassword = await hash.comparePassword(payload.password, currentUser.data.password);
        if (comparedPassword && !comparedPassword.data) {
            return wrapper.error(new BadRequestError('Password missmatch!'));
        }

        if (duplicateUser && duplicateUser.data) {
            return wrapper.error(new EmailAlreadyInUseError());
        }

        const document = {
            emailAddress: payload.newEmail,
        };

        const result = await this.userCommand.updateUser(query, document);
        if (result.err) {
            return wrapper.error(new BadRequestError('Error while update the email!'));
        }

        return wrapper.data('success');
    }

    async updatePassword(payload) {
        const query = {
            emailAddress: payload.email
        }
        const currentUser = await this.userQuery.getUser(query);
        if (!currentUser || currentUser.err) {
            return wrapper.error(new NotFoundError('No user exist!'));
        }

        const hashedPassword = await hash.hashPassword(payload.password);
        const updateDocument = {
            password: hashedPassword.data
        };
        const result = await this.userCommand.updateUser(query, updateDocument);
        if (result.err) {
            return wrapper.error(new BadRequestError('Error while updating password!'));
        }

        return wrapper.data('Success update password!');
    }

    async deleteUser(payload) {
        const query = {
            emailAddress: payload.email,
        };

        const result = await this.userCommand.deleteUser(query);
        if (result.err) {
            return wrapper.error(new BadRequestError('Error while deleting user data!'));
        }

        return wrapper.data('Success delete user!');
    }
}

module.exports = User