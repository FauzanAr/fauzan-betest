class Command {
    constructor(mongoDb) {
        this.mongoDb = mongoDb;
    };

    async createUser(document) {
        const result = await this.mongoDb.insertOne('users', document);
        return result;
    };

    async updateUser(parameter, document) {
        const result = await this.mongoDb.updateOne('users', parameter, document);
        return result;
    };

    async deleteUser(parameter) {
        const result = await this.mongoDb.deleteOne('users', parameter);
        return result;
    }
};

module.exports = Command;