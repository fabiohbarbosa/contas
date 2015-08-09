app.controller('IndexController',['$scope', '$location', function ($scope, $location) {

    $scope.teste = function() {
        $location.path('/teste');
    };
}]);