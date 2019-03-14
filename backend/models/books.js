const config = require('../../globalConfig').db;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
let client, db;

async function getCollection(){
    client = await MongoClient.connect(`${config.url}:${config.port}`, { useNewUrlParser: true });
    db = client.db(config.name);
    return db.collection(config.collection);
}

async function closeClient(){
    await client.close(true);
}

const books = {
    async getAll(){
        try {
            const col = await getCollection();
            const booksList = await col.find().toArray();
            await closeClient();
            return booksList;
        } catch(err) {
            throw err;
        }
    },

    async count(filter = {}){
        try {
            const col = await getCollection();
            const count = await col.countDocuments(filter);
            await closeClient();
            return {documentsCount: count, filter: filter};
        } catch(err) {
            throw err;
        }
    },

    async addMore(books){
        try {
            const col = await getCollection();
            await col.insertMany(books);
            const count = await col.countDocuments();
            await closeClient();
            return {documentsCount: count, insertedCount: books.length};
        } catch(err) {
            throw err;
        }
    },

    async getOne(id){
        try {
            const col = await getCollection();
            const currentBook = await col.findOne({_id: new ObjectId(id)});
            await closeClient();
            return currentBook;
        } catch(err) {
            throw err;
        }
    },

    async deleteOne(id){
        try {
            const col = await getCollection();
            await col.deleteOne({_id: new ObjectId(id)});
            const count = await col.countDocuments();
            await closeClient();
            return {documentsCount: count};
        } catch(err) {
            throw err;
        }
    },

    async updateOne(id, updates){
        try {
            const col = await getCollection();
            await col.updateOne({_id: new ObjectId(id)}, {$set: updates});
            const currentBook = await col.findOne({_id: new ObjectId(id)});
            await closeClient();
            return currentBook;
        } catch(err) {
            throw err;
        }
    }

};

module.exports = books;