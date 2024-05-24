const { expect } = require('chai');
const sinon = require('sinon');
const Command = require('../../../../../../src/modules/user/repositories/queries/query');

describe('Modules User Query', () => {
    let mongoDb, redis;
    const sandbox = sinon.createSandbox();
    mongoDb = {
        findOne: sandbox.stub().resolves('data'),
    }
    redis = {
        getData: sandbox.stub().resolves({data: 'data'}),
        setData: sandbox.stub().resolves('data'),
    }
    const command = new Command(mongoDb, redis);

    afterEach(() => {
        sandbox.restore();
    });

    const tableTest = [
        {
            title: 'getUser',
            func: () => command.getUser(''),
        },
        {
            title: 'getUserByAccountNumber - using cache',
            func: () => command.getUserByAccountNumber(''),
        },
        {
            title: 'getUserByAccountNumber - not using cache',
            func: () => command.getUserByAccountNumber(''),
            sandbox: () => {
                redis.getData = sandbox.stub().resolves(null),
                mongoDb.findOne = sandbox.stub().resolves({data: 'data'})
            }
        }
    ];

    for (const table of tableTest) {
        describe(table.title, () => {
            it('should success', async () => {
                if (table.sandbox) {
                    table.sandbox()
                }
                const res = await table.func();
                expect(res).to.not.null;
            });
        });
    };
})