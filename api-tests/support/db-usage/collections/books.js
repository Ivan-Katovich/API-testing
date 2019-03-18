const config = require('../../../../globalConfig').db;
const ObjectId = require('mongodb').ObjectId;
const client = require('../client');
let db;

async function getCollection(){
    db = (await client.getInstance()).db(config.name);
    return db.collection(config.collection);
}

const books = {
    async getAll(){
        try {
            const col = await getCollection();
            return await col.find().toArray();
        } catch(err) {
            throw err;
        }
    },

    async count(filter = {}){
        try {
            const col = await getCollection();
            const count = await col.countDocuments(filter);
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
            return {documentsCount: count, insertedCount: books.length};
        } catch(err) {
            throw err;
        }
    },

    async getOne(id){
        try {
            const col = await getCollection();
            return await col.findOne({_id: new ObjectId(id)});
        } catch(err) {
            throw err;
        }
    },

    async deleteOne(id){
        try {
            const col = await getCollection();
            await col.deleteOne({_id: new ObjectId(id)});
            const count = await col.countDocuments();
            return {documentsCount: count};
        } catch(err) {
            throw err;
        }
    },

    async updateOne(id, updates){
        try {
            const col = await getCollection();
            await col.updateOne({_id: new ObjectId(id)}, {$set: updates});
            return await col.findOne({_id: new ObjectId(id)});
        } catch(err) {
            throw err;
        }
    },

    async closeClient(){
        await client.stopInstance();
    }

};

module.exports = books;