const config = require('../../../globalConfig').db;
const client = require('./client');
let db;

async function getCollection(){
    db = (await client.getInstance()).db(config.name);
    return db.collection(config.collection);
}

const create = async() => {
    try {
        const col = await getCollection();
        await col.insertMany(require(`../../../db/collections/${config.collection}.json`));
    } catch (err) {
        throw err;
    }
};

const dropCollection = async () => {
    try {
        const col = await getCollection();
        await col.drop();
    } catch (err) {
        throw err;
    }
};

const remove = async() => {
    try {
        db = (await client.getInstance()).db(config.name);
        await db.dropDatabase();
    } catch(err) {
        throw err;
    }
    await client.stopInstance();
};

const closeClient = async () => {
    await client.stopInstance();
};

module.exports = {create, remove, dropCollection, closeClient};

