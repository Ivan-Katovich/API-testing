const config = require('../../globalConfig').db;
const MongoClient = require('mongodb').MongoClient;

const create = async() => {
    // console.log('start creation');
    let client, db;
    try {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
        db = client.db(config.name);
    } catch(err) {
        throw err;
    }
    // const stats = await db.stats();
    // console.log(stats);
    const col = db.collection(config.collection);
    await col.insertMany(require(`../collections/${config.collection}.json`));
    // const books = await col.find().toArray();
    // console.log(books);
    // await col.drop();
    // await db.dropDatabase();
    await client.close(true);
    // console.log('end creation');
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
    // console.log('start removing');
    let client, db;
    try {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
        db = client.db(config.name);
        await db.dropDatabase();
    } catch(err) {
        throw err;
    }
    await client.close(true);
    // console.log('end removing');
};

// create();

module.exports = {create, remove, dropCollection};

