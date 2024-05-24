const { expect } = require('chai');
const sinon = require('sinon');
const validator = require('../../../../src/helpers/utils/validator');

describe('Utils Validator', () => {
    const sandbox = sinon.createSandbox();
    let constraint;

    afterEach(() => {
        sandbox.restore();
    });

    describe('isValidPayload', () => {
        it('should return error', async () => {
            constraint = {
                validate: () => {
                    return {error: {details: [{message: 'error'}]}, value: null}
                }
            }
            const res = validator.isValidPayload('', constraint);
            expect(res.err).to.not.null;
        });
        it('should return success', async () => {
            constraint = {
                validate: () => {
                    return {error: null, value: 'success'}
                }
            }
            const res = validator.isValidPayload('', constraint);
            expect(res.data).to.not.null;
        })
    });

    // describe('error', () => {
    //     it('should return console', async () => {
    //         sandbox.stub(console, 'error').returns('123');
    //         const res = logger.error('');
    //         expect(res).to.not.null;
    //     });
    // });
})