const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('../../../../src/helpers/utils/logger');

describe('Utils Logger', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('info', () => {
        it('should return console', async () => {
            sandbox.stub(console, 'info').returns('123');
            const res = logger.info('');
            expect(res).to.not.null;
        });
    });

    describe('error', () => {
        it('should return console', async () => {
            sandbox.stub(console, 'error').returns('123');
            const res = logger.error('');
            expect(res).to.not.null;
        });
    });
})