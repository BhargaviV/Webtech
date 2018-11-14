var app = angular.module("bookapp",[]);

app.controller("ctrl",['$scope','$http',function($scope,$http)
{
        $scope.categories=[];
        $scope.page_number=[];
        $scope.books = [];
        $scope._pages=[];
        //$scope.numberOfpages = 0;
      
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
        $scope.getBooksByPage = function(id) {
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
        $scope.getBooksByPage(1);
        $http.get("/");


        $scope.getpagenumber = Array;
}])