const express = require('express');
const server = express();
const path = require('path');
server.engine('.html', require('ejs').__express);

server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'html');
server.set('PORT', 4001);
server.use(express.static('src'));

var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qmpzal',
  database : 'bookit'
});

server.get('/', (req, res, next) => {
    connection.connect(function(err) {
        if (err) throw err
        console.log('You are now connected...')
    })
    connection.query('SELECT category_name FROM category;', function(err, categories) {
        if (err) {
            throw err
        }
        connection.query('SELECT book_name,book_image_url,book_price FROM book;', function(err, books) {
            if (err) {
                throw err
            }
            res.render('index',{
                categories : categories,
                books: books
            })
        })
    }) 
});

server.listen(server.get('PORT'), () => {
    console.log("Server is running ");
});
