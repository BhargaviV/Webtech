var app = angular.module("bookapp",[]);

//factory to share objects between two controllers
app.factory("factory",function()
{
    var cart = [];
    function addtocart (book)
    {
        cart.push(book);
        cart[cart.length-1].count = 1;
        console.log(cart);
    }
    function getcartitems()
    {
        return cart;
    }
    return{
        addtocart : addtocart,
        getcartitems : getcartitems
    }
})

//controller for index page
app.controller("ctrl",['$scope','$http','$location','factory',function($scope,$http,$location, factory)
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
                $scope._pages.length = $scope.page_number[0]['totalCount'] ;
            },
            function(err)
            {
                console.log(err);
            });
        }

        $scope.getBooksByPage = function(id,category) {
            $http.get("/books", {params: {pageId:id, category: category}}).then(function(response)
            {
                $scope.books = response['data'];
                console.log($scope.books);
            },
            function(err)
            {
                console.log(err);
            });
        }
        $scope.getBooksByPage(1);

        $http.get("/");

        $scope.addtocart =function(book)
        {
            factory.addtocart(book);
            $scope.cart = factory.getcartitems();
            console.log("cart",$scope.cart);
        }

        $scope.view = function()
        {
         
            $location.path('/cart.html');
        }

        /* $scope.addtocart = function(book)
        {
            console.log(book);
            $scope.cart.push(book);
            var len  = $scope.cart.length;
            $scope.cart[len-1].count = 1;
            console.log($scope.cart);
        }*/
        $scope.getBookByCategory = function(category,id=1) {
            $scope.getBooksByPage(id,category);
        }
    
}]);

// second controller for cart page
app.controller("cartctrl",['$scope','$http','$location','factory',function($scope,$http,$location, factory)
{
    $scope.cart =  factory.getcartitems();

    $scope.increasebooks = function(index)
    {
        $scope.cart[index].count +=1;
    }

    $scope.decreasebooks = function(index)
    {
        $scope.cart[index].count -=1;
    }
    console.log($scope.cart);
}]);


/*app.config(function($stateProvider,$urlRouterProvider)
{
    $stateProvider
    .state('getcart',{
        url:'/getcart',
        templateUrl: '../templates/cart.html'
    })
    .state('addcart',{
        url:'/addcart',
        templateUrl: '../templates/index.html'
    })
});*/