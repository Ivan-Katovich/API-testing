/*process.env.https_proxy = 'http://127.0.0.1:5555';
process.env.http_proxy = 'http://127.0.0.1:5555';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';*/

const Api = require('../../support/api');
const api = new Api();

describe('Library', function() {

    before(async function(){
        await api.dbManager.remove();
        await api.dbManager.create();
    });

    // after(async function(){
    //     await api.dbManager.remove();
    //
    // });

    describe('Book List', function() {
        describe('Able to get information about books', function() {
            it('Able to get books COUNT', async function() {
                const results = await Promise.all([
                    api.rp(api.collection.getBooksCount),
                    api.dbCollections.books.count()
                ]);
                const responseBody = JSON.parse(results[0].body);
                const statusCode = results[0].statusCode;
                const dbOutput = results[1];
                api.expect(statusCode).to.be.equal(200);
                api.expect(responseBody).to.be.jsonSchema(api.schemas.resultsSchema);
                api.expect(responseBody.documentsCount).to.be.equal(dbOutput.documentsCount);
            });

            it('Able to get LIST of books', async function() {
                const results = await Promise.all([
                    api.rp(api.collection.getBooks),
                    api.dbCollections.books.count()
                ]);
                const responseBody = JSON.parse(results[0].body);
                const statusCode = results[0].statusCode;
                const dbOutput = results[1];
                api.expect(statusCode).to.be.equal(200);
                api.expect(responseBody).to.be.jsonSchema(api.schemas.bookListSchema);
                api.expect(responseBody.length).to.be.equal(dbOutput.documentsCount);
            });
        });

        describe('Able to make changes into the list of the books', function() {

            afterEach(async function(){
                await api.dbManager.dropCollection();
                await api.dbManager.create();
            });

            it('Able to add few NEW books', async function() {
                const insertCount = JSON.parse(api.collection.postBooks.body).length;
                const response = await api.rp(api.collection.postBooks);
                const responseBody = JSON.parse(response.body);
                const statusCode = response.statusCode;
                const dbOutput = await api.dbCollections.books.count();
                api.expect(statusCode).to.be.equal(200);
                api.expect(responseBody).to.be.jsonSchema(api.schemas.resultsSchema);
                api.expect(responseBody.documentsCount).to.be.equal(dbOutput.documentsCount);
                api.expect(responseBody.insertedCount).to.be.equal(insertCount);
            });
        });
    });

    describe('Separate book', function() {
        let ids;

        beforeEach(async function(){
            const books = await api.dbCollections.books.getAll();
            ids = books.map((book) => {
                return book._id;
            });
        });

        describe('Able to get information about a book', function() {
            it('Able to get INFORMATION about each book in Library', async function() {
                await Promise.all(ids.map(async (id) => {
                    const opts = Object.create(api.collection.getBook);
                    opts.url = `${opts.url}/${id}`;
                    const response = await api.rp(opts);
                    const book = JSON.parse(response.body);
                    api.expect(response.statusCode).to.be.equal(200);
                    api.expect(book).to.be.jsonSchema(api.schemas.bookSchema);
                    api.expect(book._id).to.be.equal(id.toString());
                }));
                /** available variant but takes much more time
                for (let i = 0; i < ids.length; i++) {
                    const opts = Object.create(collection.getBook);
                    opts.url = `${opts.url}/${ids[i]}`;
                    const book = JSON.parse(await rp(opts));
                    chai.expect(book).to.be.jsonSchema(schemas.bookSchema);
                }
                 **/
            });
        });

        describe('Able to make changes into a separate book', function() {

            afterEach(async function(){
                await api.dbManager.dropCollection();
                await api.dbManager.create();
            });

            it('Able to DELETE a book', async function() {
                await Promise.all(ids.map(async (id, index) => {
                    const opts = Object.create(api.collection.deleteBook);
                    opts.url = `${opts.url}/${id}`;
                    const response = await api.rp(opts);
                    const responseBody = JSON.parse(response.body);
                    api.expect(response.statusCode).to.be.equal(200);
                    api.expect(responseBody).to.be.jsonSchema(api.schemas.resultsSchema);
                    api.expect(responseBody.id).to.be.equal(id.toString());
                    if (index === ids.length - 1) {
                        const dbResult = await api.dbCollections.books.count();
                        api.expect(responseBody.documentsCount).to.be.equal(dbResult.documentsCount).to.be.equal(0);
                    }
                }));
            });

            it('Able to CHANGE everything EXCEPT ID in a book', async function() {
                const index = (Math.random() * (ids.length - 1)).toFixed(0);
                const existingBook = await api.dbCollections.books.getOne(ids[index]);
                const opts = Object.create(api.collection.updateBookWithAllNewFields);
                opts.url = `${opts.url}/${ids[index]}`;
                const response = await api.rp(opts);
                const newBook = JSON.parse(response.body);
                const newBookFromDb = await api.dbCollections.books.getOne(ids[index]);
                api.expect(response.statusCode).to.be.equal(200);
                api.expect(JSON.stringify(newBook)).to.not.equal(JSON.stringify(existingBook));
                api.expect(JSON.stringify(newBook)).to.equal(JSON.stringify(newBookFromDb));
                api.expect(newBook).to.be.jsonSchema(api.schemas.bookSchema);
                api.expect(newBookFromDb).to.be.jsonSchema(api.schemas.bookSchema);
                api.expect(newBook._id).to.equal(existingBook._id.toString());
            });

            it('NOT Able to CHANGE ID in a book', async function() {
                const index = (Math.random() * (ids.length - 1)).toFixed(0);
                const existingBook = await api.dbCollections.books.getOne(ids[index]);
                const opts = Object.create(api.collection.updateBookWithAllNewFields);
                opts.url = `${opts.url}/${ids[index]}`;
                opts.body = JSON.stringify({_id: '5c8b80b07e9711361c7428ce'});
                const response = await api.rp(opts);
                const responseBody = JSON.parse(response.body);
                const error = responseBody.err;
                const newBookFromDb = await api.dbCollections.books.getOne(ids[index]);
                api.expect(response.statusCode).to.be.equal(200);
                api.expect(responseBody).to.be.jsonSchema(api.schemas.errorSchema);
                api.expect(error.code).to.equal(66);
                api.expect(error.errmsg).to.equal(`Performing an update on the path '_id' would modify the immutable field '_id'`);
                api.expect(JSON.stringify(newBookFromDb)).to.equal(JSON.stringify(existingBook));
            });
        });
    });
});

