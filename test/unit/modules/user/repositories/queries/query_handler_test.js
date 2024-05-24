const { expect } = require('chai');
const sinon = require('sinon');
const handler = require('../../../../../../src/modules/user/repositories/queries/query_handler');
const User = require('../../../../../../src/modules/user/repositories/queries/domain');

describe('Modules User Query Handler', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    const tableTest = [
        {
            title: 'getUser',
            func: () => handler.getUser(''),
            sandbox: () => sandbox.stub(User.prototype, 'getUser').resolves({err: false, data: {}})
        },
        {
            title: 'login',
            func: () => handler.login(''),
            sandbox: () => sandbox.stub(User.prototype, 'login').resolves({err: false, data: {}})
        },
        {
            title: 'getUserByAccount',
            func: () => handler.getUserByAccount(''),
            sandbox: () => sandbox.stub(User.prototype, 'getUserByAccount').resolves({err: false, data: {}})
        }
    ];

    for (const table of tableTest) {
        describe(table.title, () => {
            it('should return succes data', async () => {
                table.sandbox();
                const res = await table.func();
                expect(res.data).to.not.null;
            });
        });
    };
})