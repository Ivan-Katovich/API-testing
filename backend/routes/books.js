const books = require('../models/books');

async function getBooks(req, res) {
    const booksList = await books.getAll();
    console.log(booksList);
    res.json(booksList);
    res.end();
}

async function addBooks(req, res){
    const result = await books.addMore(req.body);
    console.log(result);
    res.json(result);
    res.end();
}

async function getBook(req, res) {
    const currentBook = await books.getOne(req.params.id);
    console.log(currentBook);
    res.json(currentBook);
    res.end();
}

async function deleteBook(req, res) {
    const result = await books.deleteOne(req.params.id);
    console.log(result);
    res.json(result);
    res.end();
}

async function updateBook(req, res) {
    console.log(req.body);
    const currentBook = await books.updateOne(req.params.id, req.body);
    console.log(currentBook);
    res.json(currentBook);
    res.end();
}

async function countBooks(req, res) {
    const count = await books.count();
    res.json(count);
    res.end();
}

module.exports = {getBooks, getBook, addBooks, deleteBook, updateBook, countBooks};