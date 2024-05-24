const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const middleware = require('../../../../../src/helpers/auth/jwt/middleware');
const wrapper = require('../../../../../src/helpers/utils/wrapper');

describe('Auth Middleware', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('verifyAuth', () => {
        it('should return error auth not found', async () => {
            sandbox.stub(wrapper, 'response').returns({err: 'error'})
            const req = {};
            const res = middleware.verifyAuth(req, '', () => {});
            expect(res.err).to.not.null;
        });
        it('should return error invalid token', async () => {
            sandbox.stub(wrapper, 'response').returns({err: 'error'})
            const req = {
                headers: {
                    authorization: 'b'
                }
            };
            const res = middleware.verifyAuth(req, '', () => {});
            expect(res.err).to.not.null;
        });
        it('should return no error', async () => {
            sandbox.stub(jwt, 'verify').returns({userData: {}});
            const req = {
                headers: {
                    authorization: 'b a'
                }
            };
            const res = middleware.verifyAuth(req, '', () => { return 'a'});
            expect(res).to.not.null;
        });
        it('should return error invalid catch', async () => {
            sandbox.stub(wrapper, 'response').returns({err: 'error'});
            sandbox.stub(jwt, 'verify').throws('ERROR');
            const req = {
                headers: {
                    authorization: 'b a'
                }
            };
            const res = middleware.verifyAuth(req, '', () => {});
            expect(res.err).to.not.null;
        });
    });

    describe('generateToken', () => {
        it('should return token', async () => {
            sandbox.stub(jwt, 'sign').returns('token');
            const res = middleware.generateToken('');
            expect(res).to.not.null;
        });
    });
})