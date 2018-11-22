var app = angular.module("bookapp",[]);

//controller for index page
app.controller("ctrl",['$scope','$http',function($scope,$http)
{
        $scope.categories=[];
        $scope.page_number=[];
        $scope.books = [];
        $scope._pages=[];
        $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
        $scope.getpagenumber = Array;
        
        getcarttotal() ;
      
        console.log("In main",$scope.cart);
        $http.get("/getCategories").then(function(response)
        {
           $scope.categories = response['data']['categories'];
           $scope.page_number = response['data']['page_number'];
           $scope._pages.length = $scope.page_number[0]['totalCount'] ;
        },
        function(err)
        {
            console.log(err);
        });

        $scope.getBooksByPage = function(id,category) {
            $http.get("/books/"+id).then(function(response)
            {
                $scope.books = response['data'];
                console.log($scope.books);
            },
            function(err)
            {
                console.log(err);
            });
        }
        $scope.getBooksByPage(1,'All');


        $http.get("/");

        $scope.addtocart = function(book)
        {
            book.count = 1;
            $scope.cart.push(book);
            console.log($scope.cart);
            localStorage.setItem('cart',JSON.stringify($scope.cart));
            getcarttotal();
            //$scope.carttotal = getcarttotal();
        }
        $scope.getBookByCategory = function(category) {
            $http.get("/category/"+category).then(function(response)
            {
                $scope.books = response['data'];
                console.log($scope.books);
            },
            function(err)
            {
                console.log(err);
            });
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
            var total = 0;
            angular.forEach($scope.cart, function(value,key)
            {
                total += value.count * value.book_price;
            });
            $scope.carttotal = total;
        }
    
}]);

// second controller for cart page
app.controller("cartctrl",['$scope',function($scope)
{
    $scope.cart =  JSON.parse(localStorage.getItem('cart')); 
    $scope.increasebooks = function(book)
    {
        book.count +=1;
        console.log($scope.cart);
    }
    $scope.decreasebooks = function(book)
    {
        book.count -=1;
    }
    $scope.update = function()
    {
        //console.log($scope.cart);
        localStorage.setItem('cart',JSON.stringify($scope.cart));
    }
}]);


//controller for product detail page
app.controller("detailctrl",['$scope',function($scope)
{
    $scope.book =  JSON.parse(localStorage.getItem('book_detail'));
    $scope.book.count = 1; 
    console.log("jfh",$scope.book);

    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.addtocart = function(book)
    {
        $scope.cart.push(book);
        console.log($scope.cart);
        localStorage.setItem('cart',JSON.stringify($scope.cart));
    }
    
}]);