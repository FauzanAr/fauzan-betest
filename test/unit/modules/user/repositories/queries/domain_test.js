const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../../../../../../src/modules/user/repositories/queries/domain');
const Query = require('../../../../../../src/modules/user/repositories/queries/query');
const hash = require('../../../../.././../src/helpers/utils/hash');
const auth = require('../../../../../../src/helpers/auth/jwt/middleware');
const user = new User('', '');

describe('Modules User Query Domain', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('getUser', () => {
        it('should return error no existing user', async () => {
            sandbox.stub(Query.prototype, 'getUser').resolves({data: ''});
            const res = await user.getUser({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(Query.prototype, 'getUser').resolves({data: 'data'});
            const res = await user.getUser({});
            expect(res.data).to.not.null;
        });
    });

    describe('getUserByAccount', () => {
        it('should return account number not found', async () => {
            const res = await user.getUserByAccount({});
            expect(res.err).to.not.null;
        });

        it('should return error no exist user', async () => {
            sandbox.stub(Query.prototype, 'getUserByAccountNumber').resolves({data: ''});
            const res = await user.getUserByAccount({accountNumber: 'a'});
            expect(res.err).to.not.null;
        });

        it('should return data', async () => {
            sandbox.stub(Query.prototype, 'getUserByAccountNumber').resolves({data: 'a'});
            const res = await user.getUserByAccount({accountNumber: 'a'});
            expect(res.data).to.not.null;
        });
    });

    describe('login', () => {
        it('should return no existing user', async () => {
            sandbox.stub(Query.prototype, 'getUser').resolves({data: ''});
            const res = await user.login({});
            expect(res.err).to.not.null;
        });
        it('should return error password missmatch', async () => {
            sandbox.stub(Query.prototype, 'getUser').resolves({data: 'a'});
            sandbox.stub(hash, 'comparePassword').resolves({data: false});
            const res = await user.login({});
            expect(res.err).to.not.null;
        });
        it('should return data', async () => {
            sandbox.stub(Query.prototype, 'getUser').resolves({data: {}});
            sandbox.stub(hash, 'comparePassword').resolves({data: true});
            sandbox.stub(auth, 'generateToken').returns('');
            const res = await user.login({});
            expect(res.data).to.not.null;
        });
    })
})