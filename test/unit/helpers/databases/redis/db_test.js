const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../../../src/helpers/databases/redis/connection');
const Redis = require('../../../../../src/helpers/databases/redis/db');
const db = new Redis();

describe('Database Redis DB', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('getData', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.getData('');
            expect(res).to.not.null;
        });
        it('should return data!', async () => {
            const getData = {
                get: function() {
                    return {data: ''}
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(getData);
            sandbox.stub(JSON, 'parse').returns({data: 'data'});
            const res = await db.getData('');
            expect(res.data).to.not.null;
        });
        it('should return data empty!', async () => {
            const getData = {
                get: function() {
                    return null
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(getData);
            const res = await db.getData('');
            expect(res.data).to.null;
        });
        it('should return error throws!', async () => {
            const getOne = {
                get: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(getOne);
            const res = await db.getData('');
            expect(res.err).to.not.null;
        });
    });

    describe('setData', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.setData('', '');
            expect(res.err).to.not.null;
        });
        it('should return error nullable data', async () => {
            sandbox.stub(connection, 'getConnection').resolves({data: ''});
            const res = await db.setData('', '');
            expect(res.err).to.not.null;
        });
        it('should return data!', async () => {
            const setData = {
                set: function() {
                    return {data: ''}
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(setData);
            sandbox.stub(JSON, 'stringify').returns('{}');
            const res = await db.setData('', 'a');
            expect(res.data).to.not.null;
        });
        it('should return error throws!', async () => {
            const setData = {
                get: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(setData);
            const res = await db.setData('', 'a');
            expect(res.err).to.not.null;
        });
    });
})