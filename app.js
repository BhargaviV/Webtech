
const express = require('express');
const server = express();
const path = require('path');

server.set('PORT', 4001);
server.use(express.static('src'));
server.use(express.static('templates'));

const category = require('./models/category');
const book = require('./models/books');


//https://stackoverflow.com/questions/35694504/pagination-in-nodejs-with-mysql
server.get('/getCategories', (req, res, next) => {
    category.getAllCategories(function(err, categories) {
        if (err) {
            res.send(err);
        }
        book.getCountOfAllPages(function(err, count) {
            if (err) {
                res.send(err); 
            }
            res.send({'categories':categories,'page_number':count});
        })
    })
});

server.get('/books/:id',  (req, res, next) => {
    book.getBookByPage(req.params.id, function(err, books) {
        if (err) {
            res.send(err);
        }
        res.send(books);
    });
});

server.get('/product-detail', (req, res, next) => {
    book.getBookById(req.query.bookId, function(err, book) {
        if (err)
          res.send(err);
        res.send(book);
      });
});



server.listen(server.get('PORT'), () => {
    console.log("Server is running");
});




