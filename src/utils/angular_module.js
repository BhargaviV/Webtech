var app = angular.module("bookapp",[]);

//controller for index page
app.controller("ctrl",['$scope','$http',function($scope,$http)
{
        $scope.categories=[];
        $scope.page_number=[];
        $scope.books = [];
        $scope._pages=[];
        $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
        $scope.category = undefined;
        $scope.cart_count = localStorage.getItem('count') || 0;
        $scope.current_page_number = 1;
        $scope.total_books = undefined;
        getcarttotal() ;
      
        console.log("In main",$scope.cart);
        $http.get("/getCategories").then(function(response)
        {
           $scope.categories = response['data']['categories'];
           $scope.getPageNumber();
        },
        function(err)
        {
            console.log(err);
        });

        $scope.getPageNumber = function(category) {
            $http.get("/getTotalPages",{params: {category: category} }).then(function(response)
            {
                $scope.page_number = response['data']['page_number'];
                $scope._pages.length = Math.ceil($scope.page_number[0]['totalCount']);
                $scope.total_books = $scope.page_number[0]['totalCount'] * 10;
                $scope.end_book = (($scope.current_page_number * 10) < $scope.total_books) ? ($scope.current_page_number * 10) : $scope.total_books;
            },
            function(err)
            {
                console.log(err);
            });
        }

        $scope.getBooksByPage = function(id,category) {
            $scope.current_page_number = id;
            $http.get("/books", {params: {pageId:id, category: category}}).then(function(response)
            {
                $scope.books = response['data'];
                $scope.start_book = (($scope.current_page_number-1) * 10) + 1;
                $scope.end_book = (($scope.current_page_number * 10) < $scope.total_books) ? ($scope.current_page_number * 10) : $scope.total_books;
            },
            function(err)
            {
                console.log(err);
            });
        }
        $scope.getBooksByPage(1);

        $http.get("/");

        $scope.addtocart = function(book)
        {
            book.count = 1;
            book.isincart = true;
            $scope.cart.push(book);
            localStorage.setItem('cart',JSON.stringify($scope.cart));
            getcarttotal();
        }
        $scope.getBookByCategory = function(category,id=1) {
            $scope.category = category;
            $scope.getPageNumber(category);
            $scope.getBooksByPage(id,category);
        }

        $scope.send_to_cart = function()
        {
            localStorage.setItem('cart',JSON.stringify($scope.cart));
            location.href = "/cart.html";
        }

        $scope.send_to_details = function(book)
        {
            localStorage.setItem('book_detail',JSON.stringify(book));
            location.href = "/product-detail.html";
        }

        function getcarttotal()
        {
            var total = 0; var count = 0;
            angular.forEach($scope.cart, function(value,key)
            {
                total += value.count * value.book_price;
                count += 1;
            });
            $scope.carttotal = total;
            $scope.cart_count = count;
            localStorage.setItem('cart_count',JSON.stringify(count));
        }
    
}]);

// second controller for cart page
app.controller("cartctrl",['$scope',function($scope)
{
    $scope.cart =  JSON.parse(localStorage.getItem('cart')); 
    $scope.update = function()
    {
        localStorage.setItem('cart',JSON.stringify($scope.cart));
    }
}]);


//controller for product detail page
app.controller("detailctrl",['$scope','$http',function($scope,$http)
{
    $scope.book =  JSON.parse(localStorage.getItem('book_detail'));
    $scope.book.count = $scope.book.count || 1;
    $scope.cart_count = JSON.parse(localStorage.getItem('cart_count')) || 0;
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    $scope.recommendation =[];
    
    $scope.addtocart = function(book)
    {
        book.isincart = true;
        $scope.cart.push(book);
        localStorage.setItem('cart',JSON.stringify($scope.cart));
    }
    
    $http.get("/recommend/" + $scope.book.book_id).then(
        function (response)
        {
            $scope.recommendation = response['data'];
            console.log($scope.recommendation);
        },
        function (err)
        {
            console.log(err);
        }
        
    );

}]);