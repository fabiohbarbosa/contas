app.controller('IndexController',['$scope', '$location', function ($scope, $location) {

    $scope.routeToCategoria = function() {
        $location.path('/categoria');
    };
}]);