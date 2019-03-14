const rp = require('request-promise');
const chai = require('chai');
chai.use(require('chai-json-schema'));
const schemas = require('../../schemas/schemas');
const backendConf = require('../../../globalConfig').backend;
const collection = require('../../collections/bookCollection');
const baseUrl = `${backendConf.url}:${backendConf.port}`;
const dbManager = require('../../../db/utils/dbManager');
const dbUsage = require('../../dbUsage/booksCollection');

function prepareCollections(collection, baseUrl){
    const keys = Object.keys(collection);
    keys.forEach((key) => {
        collection[key].url = `${baseUrl}${collection[key].url}`;
        if (collection[key].body) {
            collection[key].body = JSON.stringify(collection[key].body);
        }
    })
}

prepareCollections(collection, baseUrl);

describe('Books spec', function() {
    before(async function(){
        await dbManager.remove();
    });

    beforeEach(async function(){
        await dbManager.create();
    });

    afterEach(async function(){
        await dbManager.dropCollection();
    });

    after(async function(){
        await dbManager.remove();
    });

    it('get-books-count test', async function() {
        // const opts = collection.getBooksCount;
        // opts.url = `${baseUrl}${opts.url}`;
        // console.log(opts.url);
        const results = await Promise.all([
            (async () => {
                return await rp(collection.getBooksCount);
            })(),
            (async () => {
                return dbUsage.count();
            })()
        ]);
        const responseBody = JSON.parse(results[0]);
        const dbOutput = results[1];
        chai.expect(responseBody).to.be.jsonSchema(schemas.resultsSchema);
        chai.expect(responseBody.documentsCount).to.be.equal(dbOutput.documentsCount);
    });

    it('get-books test', async function() {
        // const opts = collection.getBooks;
        // opts.url = `${baseUrl}${opts.url}`;
        // console.log(opts.url);
        const results = await Promise.all([
            (async () => {
                return await rp(collection.getBooks);
            })(),
            (async () => {
                return dbUsage.count();
            })()
        ]);
        const responseBody = JSON.parse(results[0]);
        const dbOutput = results[1];
        chai.expect(responseBody).to.be.jsonSchema(schemas.bookListSchema);
        chai.expect(responseBody.length).to.be.equal(dbOutput.documentsCount);
    });

    it('post-books test', async function() {
        // const opts = collection.postBooks;
        // opts.url = `${baseUrl}${opts.url}`;
        const insertCount = JSON.parse(collection.postBooks.body).length;
        // opts.body = JSON.stringify(opts.body);
        // console.log(opts.url);
        const responseBody = JSON.parse(await rp(collection.postBooks));
        const dbOutput = await dbUsage.count();
        chai.expect(responseBody).to.be.jsonSchema(schemas.resultsSchema);
        chai.expect(responseBody.documentsCount).to.be.equal(dbOutput.documentsCount);
        chai.expect(responseBody.insertedCount).to.be.equal(insertCount);
    });
});