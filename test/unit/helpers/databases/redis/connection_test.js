const { expect } = require('chai');
const sinon = require('sinon');
const Redis = require('ioredis');
const connection = require('../../../../../src/helpers/databases/redis/connection');

describe('Databases Redis Connection', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('getConnection', () => {
        it('should return connection', async () => {
            sandbox.stub(Redis.prototype, 'connect').resolves({});
            const res = connection.getConnection();
            expect(res).to.not.null;
        });
        it('should return error', async () => {
            sandbox.stub(Redis.prototype, 'connect').throws('ERROR');
            const res = connection.getConnection();
            expect(res).to.not.null;
        });
    });

    describe('init', () => {
        it('should return connection', async () => {
            sandbox.stub(Redis.prototype, 'connect').resolves({});
            const res = connection.init();
            expect(res).to.not.null;
        });
    });
})