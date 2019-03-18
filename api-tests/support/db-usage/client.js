const MongoClient = require('mongodb').MongoClient;
const config = require('../../../globalConfig').db;
let instance = null;

module.exports = {
    async getInstance(){
        try {
            if (!instance) {
                instance = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
            }
            return instance
        } catch (err) {
            throw err;
        }

    },
    async stopInstance(){
        try {
            await instance.close(true);
            instance = null
        } catch (err) {
            throw err;
        }
    }
};