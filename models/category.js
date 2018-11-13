var sql = require('../common.js');

var Category = function(){
};

Category.getAllCategories = function (result) {
    sql.query("SELECT category_name FROM category;", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                // console.log('Categories : ', res);  
                result(null, res);
            }
        });   
};

module.exports = Category;