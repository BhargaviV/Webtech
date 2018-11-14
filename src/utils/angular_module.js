var app = angular.module("bookapp",[]);

app.controller("ctrl",['$scope','$http',function($scope,$http)
{
        $scope.categories=[];
        $scope.page_number=[];
        $scope.books = [];
        $http.get("/getCategories").then(function(response)
        {
           $scope.categories = response['data']['categories'];
           $scope.page_number = response['data']['page_number'];
        //    console.log($scope.categories);
        },
        function(err)
        {
            console.log(err);
        });
        this.getBooksByPage = function(id) {
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
        this.getBooksByPage(1);
        $http.get("/")
}])