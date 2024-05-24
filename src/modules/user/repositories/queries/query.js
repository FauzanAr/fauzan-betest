class Query {
    constructor(mongoDb, redis) {
        this.mongoDb = mongoDb;
        this.redis = redis;
    }

    async getUser(parameter) {
        const result = await this.mongoDb.findOne('users', parameter);
        return result;
    }

    async getUserByAccountNumber(accountNumber) {
        const key = `users:${accountNumber}`;
        const cache = await this.redis.getData(key);
        if (!cache || cache.err || !cache.data) {
            const parameter = { accountNumber };
            const result = await this.mongoDb.findOne('users', parameter);
            if (result && result.data) {
                await this.redis.setData(key, result.data);
            }

            return result;
        }

        return cache;
    }

}

module.exports = Query;