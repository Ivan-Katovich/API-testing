const config = require('../../globalConfig').db;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
let client, db;

async function getCollection(){
    if (!client) {
        client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
    }
    db = client.db(config.name);
    return db.collection(config.collection);
}

// async function closeClient(){
//     await client.close(true);
// }

const books = {
    async getAll(){
        try {
            const col = await getCollection();
            return await col.find().toArray();
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    },

    async count(filter = {}){
        try {
            const col = await getCollection();
            const count = await col.countDocuments(filter);
            return {documentsCount: count, filter: filter};
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    },

    async addMore(books){
        try {
            const col = await getCollection();
            await col.insertMany(books);
            const count = await col.countDocuments();
            return {documentsCount: count, insertedCount: books.length};
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    },

    async getOne(id){
        try {
            const col = await getCollection();
            return await col.findOne({_id: new ObjectId(id)});
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    },

    async deleteOne(id){
        try {
            const col = await getCollection();
            await col.deleteOne({_id: new ObjectId(id)});
            const count = await col.countDocuments();
            return {documentsCount: count, id: id};
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    },

    async updateOne(id, updates){
        try {
            const col = await getCollection();
            await col.updateOne({_id: new ObjectId(id)}, {$set: updates});
            return await col.findOne({_id: new ObjectId(id)});
        } catch(err) {
            console.error(err);
            return {err: err};
        }
    }

};

module.exports = books;