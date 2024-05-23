class Query {
    constructor(mongoDb) {
        this.mongoDb = mongoDb;
    }

    async getUser(parameter) {
        const result = await this.mongoDb.findOne('users', parameter);
        return result;
    }

    async getUserByAccountNumber(accountNumber) {
        const parameter = { accountNumber };
        const result = await this.mongoDb.findOne('users', parameter);
        return result;
    }

}

module.exports = Query;