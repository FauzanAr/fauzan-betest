const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const mongoDb = require('../../../../../src/helpers/databases/mongodb/connection');

describe('Databases MongoDb Connection', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('getConnection', () => {
        it('should return connection', async () => {
            sandbox.stub(MongoClient.prototype, 'connect').resolves({db: () => {}});
            const res = mongoDb.getConnection();
            expect(res).to.not.null;
        });
        it('should return error', async () => {
            sandbox.stub(MongoClient.prototype, 'connect').throws('ERROR');
            const res = mongoDb.getConnection();
            expect(res).to.not.null;
        });
    });

    describe('init', () => {
        it('should return connection', async () => {
            sandbox.stub(MongoClient.prototype, 'connect').resolves({db: () => {}});
            const res = mongoDb.init();
            expect(res).to.not.null;
        });
    });
})