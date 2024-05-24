const { expect } = require('chai');
const sinon = require('sinon');
const handler = require('../../../../../../src/modules/user/repositories/commands/command_handler');
const User = require('../../../../../../src/modules/user/repositories/commands/domain');

describe('Modules User Command Handler', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    const tableTest = [
        {
            title: 'createUser',
            func: () => handler.createUser(''),
            sandbox: () => sandbox.stub(User.prototype, 'createUser').resolves({err: false, data: {}})
        },
        {
            title: 'updateEmail',
            func: () => handler.updateEmail(''),
            sandbox: () => sandbox.stub(User.prototype, 'updateEmail').resolves({err: false, data: {}})
        },
        {
            title: 'updatePassword',
            func: () => handler.updatePassword(''),
            sandbox: () => sandbox.stub(User.prototype, 'updatePassword').resolves({err: false, data: {}})
        },
        {
            title: 'updateUser',
            func: () => handler.updateUser(''),
            sandbox: () => sandbox.stub(User.prototype, 'updateUser').resolves({err: false, data: {}})
        },
        {
            title: 'deleteUser',
            func: () => handler.deleteUser(''),
            sandbox: () => sandbox.stub(User.prototype, 'deleteUser').resolves({err: false, data: {}})
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