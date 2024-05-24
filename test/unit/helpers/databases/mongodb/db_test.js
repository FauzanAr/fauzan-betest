const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../../../src/helpers/databases/mongodb/connection');
const DB = require('../../../../../src/helpers/databases/mongodb/db');
const db = new DB();

describe('Database MongoDb DB', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('findOne', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.findOne('', '');
            expect(res).to.not.null;
        });
        it('should return data not found!', async () => {
            const findOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                findOne: function() {
                    return null
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(findOne);
            const res = await db.findOne('', '');
            expect(res.err).to.not.null;
        });
        it('should return data!', async () => {
            const findOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                findOne: function() {
                    return {data: 'data'};
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(findOne);
            const res = await db.findOne('', '');
            expect(res.data).to.not.null;
        });
        it('should return error throws!', async () => {
            const findOne = {
                collection: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(findOne);
            const res = await db.findOne('', '');
            expect(res.err).to.not.null;
        });
    });

    describe('insertOne', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.insertOne('', '');
            expect(res).to.not.null;
        });
        it('should return failed insert data!', async () => {
            const insertOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                insertOne: function() {
                    return {insertedId: null}
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(insertOne);
            const res = await db.insertOne('', '');
            expect(res.err).to.not.null;
        });
        it('should return data!', async () => {
            const insertOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                insertOne: function() {
                    return {insertedId: 'data'};
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(insertOne);
            const res = await db.insertOne('', '');
            expect(res.data).to.not.null;
        });
        it('should return error throws!', async () => {
            const insertOne = {
                collection: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(insertOne);
            const res = await db.insertOne('', '');
            expect(res.err).to.not.null;
        });
    });

    describe('updateOne', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.updateOne('', '', '');
            expect(res).to.not.null;
        });
        it('should return failed update data!', async () => {
            const updateOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                updateOne: function() {
                    return {modifiedCount: null}
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(updateOne);
            const res = await db.updateOne('', '', '');
            expect(res.err).to.not.null;
        });
        it('should return data!', async () => {
            const updateOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                updateOne: function() {
                    return {modifiedCount: 'data'};
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(updateOne);
            const res = await db.updateOne('', '', '');
            expect(res.data).to.not.null;
        });
        it('should return error throws!', async () => {
            const updateOne = {
                collection: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(updateOne);
            const res = await db.updateOne('', '', '');
            expect(res.err).to.not.null;
        });
    });

    describe('deleteOne', () => {
        it('should return errConnection', async () => {
            sandbox.stub(connection, 'getConnection').resolves({err: 'error'});
            const res = await db.deleteOne('', '');
            expect(res).to.not.null;
        });
        it('should return failed delete data!', async () => {
            const deleteOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                deleteOne: function() {
                    return {deletedCount: 0}
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(deleteOne);
            const res = await db.deleteOne('', '');
            expect(res.err).to.not.null;
        });
        it('should return data!', async () => {
            const deleteOne = {
                collection: function(name) {
                    this.dbName = name
                    return this
                },
                deleteOne: function() {
                    return {deletedCount: 1};
                }
            }
            sandbox.stub(connection, 'getConnection').resolves(deleteOne);
            const res = await db.deleteOne('', '');
            expect(res.data).to.not.null;
        });
        it('should return error throws!', async () => {
            const deleteOne = {
                collection: sandbox.stub().throws({message: 'err'})
            }
            sandbox.stub(connection, 'getConnection').resolves(deleteOne);
            const res = await db.deleteOne('', '');
            expect(res.err).to.not.null;
        });
    });
})