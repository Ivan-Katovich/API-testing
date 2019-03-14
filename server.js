const config = require('./globalConfig').backend;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const books = require('./backend/routes/books');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.route('/books')
    .get(books.getBooks)
    .post(books.addBooks);
app.route('/book/:id')
    .get(books.getBook)
    .delete(books.deleteBook)
    .put(books.updateBook);
app.route('/books/count')
    .get(books.countBooks);

app.listen(config.port);