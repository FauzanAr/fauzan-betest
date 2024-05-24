const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../../../../../src/helpers/utils/validator');
const handlers = require('../../../../../src/modules/user/handlers/api');
const queryHandler = require('../../../../../src/modules/user/repositories/queries/query_handler');
const commandHandler = require('../../../../../src/modules/user/repositories/commands/command_handler');

describe('Modules User API', () => {
    let res, resResult;
    const sandbox = sinon.createSandbox();
    const req = {
        user: {
            emailAddress: '',

        },
        body: {},
        params: {
            accountNumber: ''
        }
    };

    beforeEach(() => {
        resResult = {};
        res = {
            send: function (code, response) {
                resResult = response;
                return true;
            },
        };
    })

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUser', () => {
        it('should return error', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({ err: true, data: null });
            await handlers.getUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({ err: false, data: null });
            await handlers.getUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('updateUser', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(commandHandler, 'updateUser').resolves({ err: true, data: null });
            await handlers.updateUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(commandHandler, 'updateUser').resolves({ err: false, data: null });
            await handlers.updateUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('deleteUser', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(commandHandler, 'deleteUser').resolves({ err: true, data: null });
            await handlers.deleteUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(commandHandler, 'deleteUser').resolves({ err: false, data: null });
            await handlers.deleteUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('createUser', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(commandHandler, 'createUser').resolves({ err: true, data: null });
            await handlers.createUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(commandHandler, 'createUser').resolves({ err: false, data: null });
            await handlers.createUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('updateEmailUser', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(commandHandler, 'updateEmail').resolves({ err: true, data: null });
            await handlers.updateEmailUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(commandHandler, 'updateEmail').resolves({ err: false, data: null });
            await handlers.updateEmailUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('updatePasswordUser', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(commandHandler, 'updatePassword').resolves({ err: true, data: null });
            await handlers.updatePasswordUser(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(commandHandler, 'updatePassword').resolves({ err: false, data: null });
            await handlers.updatePasswordUser(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('login', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(queryHandler, 'login').resolves({ err: true, data: null });
            await handlers.login(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(queryHandler, 'login').resolves({ err: false, data: null });
            await handlers.login(req, res);
            expect(resResult).to.not.null;
        });
    });

    describe('getUserByAccount', () => {
        it('should return error', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: true, data: null });
            sandbox.stub(queryHandler, 'getUserByAccount').resolves({ err: true, data: null });
            await handlers.getUserByAccount(req, res);
            expect(resResult).to.not.null;
        });
        it('should return success', async () => {
            sandbox.stub(validator, 'isValidPayload').returns({ err: false, data: null });
            sandbox.stub(queryHandler, 'getUserByAccount').resolves({ err: false, data: null });
            await handlers.getUserByAccount(req, res);
            expect(resResult).to.not.null;
        });
    });
})