var sql = require('../common.js');

var Book = function(){
};

// Display 10 items per page
Book.perPage = 10;

Book.getAllBooks = function getAllBooks(result) {
    sql.query("SELECT book_id,book_name,book_image_url,book_price FROM book;", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
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

Book.getBookByPage = function getBookByPage(pageId, books) {
    currentPage = pageId > 0 ? pageId : 1,
    sql.query('SELECT COUNT(*) as totalCount FROM book;',(err,result)=>{
        if(err) {
            console.log("error: ", err);
            books(err, null);
        }
        else{
            const perPage = Book.perPage;
            totalCount = result[0].totalCount;
            const start = perPage*(pageId - 1);
            sql.query('SELECT book_id,book_name,book_image_url,book_price FROM book LIMIT '+perPage+' OFFSET '+start,(err,res)=>{
                if(err) {
                    console.log("error: ", err);
                    books(err, null);
                }
                else{
                    books(null,res);
                }
            });
        }
    });  
}

Book.getCountOfAllPages = function getCountOfAllPages(result) {
    sql.query("SELECT (COUNT(*)/"+Book.perPage+") as totalCount FROM book;", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
}

module.exports = Book;