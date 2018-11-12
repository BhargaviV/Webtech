const express = require('express');
const server = express();
const path = require('path');
server.engine('.html', require('ejs').__express);

server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'templates'));
server.set('PORT', 4001);
server.use(express.static('src'));

const category = require('./models/category');
const book = require('./models/books');

server.get('/', (req, res, next) => {
    category.getAllCategories(function(err, categories) {
        if (err)
            res.send(err);
        book.getAllBooks(function(err, books) {
            if (err)
                res.send(err);
            book.getCountOfAllPages(function(err, count) {
                if (err)
                    res.send(err); 
                res.render('index',{
                    categories : categories,
                    books: books,
                    count: count[0]
                })
            })
        });
    });
});

server.get('/books/:id',  (req, res, next) => {
    book.getBookByPage(req.params.id, function(err, books) {
        if (err)
            res.send(err);
        res.render('books',{
            books: books
        })
    });
});

server.get('/product-detail', (req, res, next) => {
    book.getBookById(req.query.bookId, function(err, book) {
        if (err)
          res.send(err);
        res.render('product-detail',{
            books: book
        })
      });
});

server.get('/checkout', (req, res, next) => {
    res.render('checkout',{
    })
});

server.get('/cart', (req, res, next) => {
    res.render('cart',{
    })
});

server.listen(server.get('PORT'), () => {
    console.log("Server is running ");
});
