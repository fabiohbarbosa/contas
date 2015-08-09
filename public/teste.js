app.controller('TesteController',['$scope', '$location', function ($scope, $location) {

    $scope.teste = function() {
        $location.path('/');
    };
}]);