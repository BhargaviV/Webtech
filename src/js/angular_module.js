var app = angular.module("bookapp",[]);

app.controller('bookctrl',['$http',function($http)
{   
    $http.get('/').then(function(data)
    {
        this.books = data;
        console.log(data);
    },
    function(err)
    {
        console.log("failed to load",err);
    });

}]);