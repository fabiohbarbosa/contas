app.controller('IndexController',['$scope', '$location', function ($scope, $location) {

    $scope.routeToCategories = function() {
        $location.path('/category');
    };
}]);