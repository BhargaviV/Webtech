var sql = require('../common.js');

var Book = function(){
};

// Display 10 items per page
Book.perPage = 12;

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

Book.getBookByPage = function getBookByPage(pageId, category, books) {
    currentPage = pageId > 0 ? pageId : 1;
    var fetchCountQuery = undefined;
    if(category != null) {
        fetchCountQuery = "SELECT COUNT(*) as totalCount FROM book natural join category where category_name = '"+category+"';"
    }
    else {
        fetchCountQuery = "SELECT COUNT(*) as totalCount FROM book ;"
    }
    sql.query(fetchCountQuery,(err,result)=>{
        if(err) {
            console.log("error: ", err);
            books(err, null);
        }
        else{
            const perPage = Book.perPage;
            totalCount = result[0].totalCount;
            const start = perPage*(pageId - 1);
            var fetchBookQuery = undefined;
            if(category != null) {
                fetchBookQuery = "SELECT book_id,book_name,book_image_url,book_price,author_name,category_name FROM book natural join category natural join author where category_name = '"+category+"' LIMIT "+perPage+" OFFSET "+start+";";
            }
            else {
                fetchBookQuery = "SELECT book_id,book_name,book_image_url,book_price,author_name,category_name FROM book natural join author natural join category LIMIT "+perPage+" OFFSET "+start+";";
            }
            sql.query(fetchBookQuery,(err,res)=>{
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

Book.getCountOfAllPages = function getCountOfAllPages(category, result) {
    var query = undefined;
    if(category != null) {
        query = "SELECT (COUNT(*)/"+Book.perPage+") as totalCount FROM book natural join category where category_name = '"+ category +"';"
    }
    else {
        query = "SELECT (COUNT(*)/"+Book.perPage+") as totalCount FROM book ;"
    }
    sql.query(query, function (err, res) {
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