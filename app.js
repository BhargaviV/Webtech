
const express = require('express');
const server = express();
const spawn = require("child_process").spawn;

server.set('PORT', 4001);
server.use(express.static('src'));
server.use(express.static('templates'));

const category = require('./models/category');
const book = require('./models/books');


server.get('/getCategories', (req, res, next) => {
    category.getAllCategories(function(err, categories) {
        if (err) {
            res.send(err);
        }
        res.send({'categories':categories});
    })
});

server.get('/getTotalPages', (req, res, next) => {
    book.getCountOfAllPages(req.query.category, function(err, count) {
      if(err) {
          res.send(err);
      }
      res.send({'page_number':count});  
    })
});

server.get('/books',  (req, res, next) => {
    book.getBookByPage(req.query.pageId,req.query.category , function(err, books) {
        if (err) {
            res.send(err);
        }
        res.send(books);
    });
});

server.get('/recommend/:id',(req,res,next) =>
{
    book_id = req.params.id;
    number = 4;
    const pythonProcess = spawn('python',["./recommendation/get_similar_books.py", book_id, number]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
        res.send(data.toString());
    });
});


server.listen(server.get('PORT'), () => {
    console.log("Server is running");
});



