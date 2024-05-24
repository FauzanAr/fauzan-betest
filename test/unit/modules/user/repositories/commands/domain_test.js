const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../../../../../src/modules/user/repositories/commands/domain');
const Command = require('../../../../../../src/modules/user/repositories/commands/command');
const hash = require('../../../../.././../src/helpers/utils/hash');
const queryHandler = require('../../../../../../src/modules/user/repositories/queries/query_handler');
const user = new User('');

describe('Modules User Command Domain', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('createUser', () => {
        it('should return error hashing', async () => {
            sandbox.stub(hash, 'hashPassword').resolves({err: 'err'});
            const res = await user.createUser({});
            expect(res.err).to.not.null;
        });
        it('should return error email already in use', async () => {
            sandbox.stub(hash, 'hashPassword').resolves({data: ''});
            sandbox.stub(queryHandler, 'getUser').resolves({data: 'data'});
            const res = await user.createUser({});
            expect(res.err).to.not.null;
        });
        it('should return error while creating user', async () => {
            sandbox.stub(hash, 'hashPassword').resolves({data: ''});
            sandbox.stub(queryHandler, 'getUser').resolves({});
            sandbox.stub(Command.prototype, 'createUser').resolves({err: 'error'});
            const res = await user.createUser({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(hash, 'hashPassword').resolves({data: ''});
            sandbox.stub(queryHandler, 'getUser').resolves({});
            sandbox.stub(Command.prototype, 'createUser').resolves({});
            const res = await user.createUser({});
            expect(res.data).to.not.null;
        });
    });

    describe('updateUser', () => {
        it('should return no user exist', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({err: 'err'});
            const res = await user.updateUser({});
            expect(res.err).to.not.null;
        });
        it('should return password missmatch', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: {}});
            sandbox.stub(hash, 'comparePassword').resolves({data: false});
            const res = await user.updateUser({});
            expect(res.err).to.not.null;
        });
        it('should return error while updating user', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: {}});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            sandbox.stub(Command.prototype, 'updateUser').resolves({err: 'err'});
            const res = await user.updateUser({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: {}});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            sandbox.stub(Command.prototype, 'updateUser').resolves({data: 'data'});
            const res = await user.updateUser({});
            expect(res.data).to.not.null;
        });
    });

    describe('updateEmail', () => {
        it('should return no user exist', async () => {
            const getUser = sandbox.stub(queryHandler, 'getUser');
            getUser.onFirstCall().resolves({err: 'err'});
            getUser.onSecondCall().resolves({data: 'data'});
            const res = await user.updateEmail({});
            expect(res.err).to.not.null;
        });
        it('should return password missmatch', async () => {
            const getUser = sandbox.stub(queryHandler, 'getUser');
            getUser.onFirstCall().resolves({data: 'data'});
            getUser.onSecondCall().resolves({err: 'err'});
            sandbox.stub(hash, 'comparePassword').resolves({data: false});
            const res = await user.updateEmail({});
            expect(res.err).to.not.null;
        });
        it('should return email already in use', async () => {
            const getUser = sandbox.stub(queryHandler, 'getUser');
            getUser.onFirstCall().resolves({data: 'data'});
            getUser.onSecondCall().resolves({data: 'data'});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            const res = await user.updateEmail({});
            expect(res.err).to.not.null;
        });
        it('should return error while update user', async () => {
            const getUser = sandbox.stub(queryHandler, 'getUser');
            getUser.onFirstCall().resolves({data: 'data'});
            getUser.onSecondCall().resolves({err: 'data'});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            sandbox.stub(Command.prototype, 'updateUser').resolves({err: 'err'});
            const res = await user.updateEmail({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            const getUser = sandbox.stub(queryHandler, 'getUser');
            getUser.onFirstCall().resolves({data: 'data'});
            getUser.onSecondCall().resolves({err: 'data'});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            sandbox.stub(Command.prototype, 'updateUser').resolves({data: 'data'});
            const res = await user.updateEmail({});
            expect(res.data).to.not.null;
        });
    });

    describe('updatePassword', () => {
        it('should return no user exist', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({err: 'err'});
            const res = await user.updatePassword({});
            expect(res.err).to.not.null;
        });
        it('should return error while hashing password', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: 'data'});
            sandbox.stub(hash, 'hashPassword').resolves({err: 'err'});
            const res = await user.updatePassword({});
            expect(res.err).to.not.null;
        });
        it('should return error while update user', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: 'data'});
            sandbox.stub(hash, 'hashPassword').resolves({data: ''});
            sandbox.stub(Command.prototype, 'updateUser').resolves({err: 'err'});
            const res = await user.updatePassword({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(queryHandler, 'getUser').resolves({data: 'data'});
            sandbox.stub(hash, 'hashPassword').resolves({data: ''});
            sandbox.stub(Command.prototype, 'updateUser').resolves({data: ''});
            const res = await user.updatePassword({});
            expect(res.data).to.not.null;
        });
    });

    describe('deleteUser', () => {
        it('should return error while deleting user', async () => {
            sandbox.stub(Command.prototype, 'deleteUser').resolves({err: 'err'});
            const res = await user.deleteUser({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(Command.prototype, 'deleteUser').resolves({data: ''});
            const res = await user.deleteUser({});
            expect(res.data).to.not.null;
        })
    })
})