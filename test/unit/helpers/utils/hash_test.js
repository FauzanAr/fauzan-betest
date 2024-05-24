const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const hash = require('../../../../src/helpers/utils/hash');

describe('Utils Hash', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('hashPassword', () => {
        it('should return success data', async () => {
            sandbox.stub(bcrypt, 'genSalt').resolves('123');
            sandbox.stub(bcrypt, 'hash').resolves('111');
            const res = await hash.hashPassword('');
            expect(res.data).to.equal('111');
        });
        it('should return error', async () => {
            sandbox.stub(bcrypt, 'genSalt').throws('error');
            const res = await hash.hashPassword('');
            expect(res.err).to.not.null;
        });
    });

    describe('comparePassword', async () => {
        it('should return success data', async () => {
            sandbox.stub(bcrypt, 'compare').resolves(true);
            const res = await hash.comparePassword('');
            expect(res.data).to.equal(true);
        });
        it('should return error', async () => {
            sandbox.stub(bcrypt, 'compare').throws('error');
            const res = await hash.comparePassword('');
            expect(res.err).to.not.null;
        })
    })
})