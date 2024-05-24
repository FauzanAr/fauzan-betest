const { expect } = require('chai');
const sinon = require('sinon');
const wrapper = require('../../../../src/helpers/utils/wrapper');
const { BadRequestError, NotFoundError, InternalServiceError, EmailAlreadyInUseError, UnauthorizedError } = require('../../../../src/helpers/error');

describe('Utils Wrapper', () => {
    const sandbox = sinon.createSandbox();
    let res, resResult;


    beforeEach(() => {
        resResult = {};
        res = {
            status: function (code) {
                this.statusCode = code
                return this
            },
            send: function () {
                return this
            }
        }
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('response', () => {
        it('should return console', async () => {
            wrapper.response(res, '', '');
            expect(res).to.not.null;
        });
        it('should error', async () => {
            wrapper.response(res, 'fail', {err: ''});
            expect(res).to.not.null;
        })
    });

    describe('checkErrorCode', () => {
        it('should return error default', async () => {
            const result = wrapper.checkErrorCode('');
            expect(result).to.not.null;
        });
        it('should return error badrequest', async () => {
            const result = wrapper.checkErrorCode(new BadRequestError());
            expect(result).to.not.null;
        });
        it('should return error notfound', async () => {
            const result = wrapper.checkErrorCode(new NotFoundError());
            expect(result).to.not.null;
        });
        it('should return error internal', async () => {
            const result = wrapper.checkErrorCode(new InternalServiceError());
            expect(result).to.not.null;
        });
        it('should return error emailalreadyinuse', async () => {
            const result = wrapper.checkErrorCode(new EmailAlreadyInUseError());
            expect(result).to.not.null;
        });
        it('should return error unauthorized', async () => {
            const result = wrapper.checkErrorCode(new UnauthorizedError());
            expect(result).to.not.null;
        });
    });
})