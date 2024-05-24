const { expect } = require('chai');
const sinon = require('sinon');
const Command = require('../../../../../../src/modules/user/repositories/commands/command');

describe('Modules User Command', () => {
    const sandbox = sinon.createSandbox();
    const mongoDb = {
        insertOne: sandbox.stub().resolves('data'),
        updateOne: sandbox.stub().resolves('data'),
        deleteOne: sandbox.stub().resolves('data'),
    }
    const command = new Command(mongoDb);

    afterEach(() => {
        sandbox.restore();
    });

    const tableTest = [
        {
            title: 'createUser',
            func: () => command.createUser(''),
        },
        {
            title: 'updateUser',
            func: () => command.updateUser(''),
        },
        {
            title: 'deleteUser',
            func: () => command.deleteUser(''),
        }
    ];

    for (const table of tableTest) {
        describe(table.title, () => {
            it('should success', async () => {
                const res = await table.func();
                expect(res).to.not.null;
            });
        });
    };
})