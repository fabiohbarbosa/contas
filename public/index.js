app.controller('IndexController',['$scope', '$location', function ($scope, $location) {

    $scope.pathCategoria = function() {
        $location.path('/categoria');
    };
}]);