const config = require('../../globalConfig').db;
const MongoClient = require('mongodb').MongoClient;

process.env.npm_config_action = process.env.npm_config_action || 'create';

const create = async() => {
    let client, db;
    try {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
        db = client.db(config.name);
    } catch(err) {
        throw err;
    }
    const col = db.collection(config.collection);
    await col.insertMany(require(`../collections/${config.collection}.json`));
    await client.close(true);
};

const dropCollection = async () => {
    let client, db;
    try {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
        db = client.db(config.name);
    } catch(err) {
        throw err;
    }
    const col = db.collection(config.collection);
    await col.drop();
    await client.close(true);
};

const remove = async() => {
    let client, db;
    try {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
        db = client.db(config.name);
        await db.dropDatabase();
    } catch(err) {
        throw err;
    }
    await client.close(true);
};

const dbManager = {create, remove, dropCollection};
console.log(process.env.npm_config_action);

dbManager[process.env.npm_config_action]();

