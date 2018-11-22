var app = angular.module("bookapp",[]);

//controller for index page
app.controller("ctrl",['$scope','$http',function($scope,$http)
{
        $scope.categories=[];
        $scope.page_number=[];
        $scope.books = [];
        $scope._pages=[];
        $scope.cart = [];
        $scope.getpagenumber = Array;
      
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
            console.log(book);
            $scope.cart.push(book);
            var len  = $scope.cart.length;
            $scope.cart[len-1].count = 1;
            console.log($scope.cart);
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

        $scope.send = function()
        {
            localStorage.setItem('cart',JSON.stringify($scope.cart));
            location.href = "/cart.html";
        }
    
}]);

// second controller for cart page
app.controller("cartctrl",['$scope','$http',function($scope,$http)
{
    $scope.cart =  JSON.parse(localStorage.getItem('cart'));

    console.log($scope.cart);
    $scope.increasebooks = function(book)
    {
        book.count +=1;
    }
    $scope.decreasebooks = function(book)
    {
        book.count -=1;
    }
    console.log($scope.cart);
}]);