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
    connection.query('SELECT category_name FROM category;', function(err, results) {
        if (err) {
            throw err
        }
        var categories = results;
        res.render('index',{
            categories : categories
        })
    }) 
    res.send().status(404);
});

server.listen(server.get('PORT'), () => {
    console.log("Server is running ");
});
