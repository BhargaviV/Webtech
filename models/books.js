var sql = require('../common.js');

var Book = function(){
};

Book.getAllBooks = function getAllBooks(result) {
    sql.query("SELECT book_id,book_name,book_image_url,book_price FROM book;", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                // console.log('Books : ', res);  
                result(null, res);
            }
        });   
};

Book.getBookById = function getBookById(bookId, result) {
    sql.query("Select book_name,book_description,book_image_url,book_price,author_name,category_name from book,author,category where author.author_id = book.author_id and category.category_id=book.category_id and book_id = ? ", bookId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });  
}

module.exports = Book;