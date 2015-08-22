app.controller('LoginCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.login = true;


    $scope.welcome="Bem Vindo!";
    $scope.user= {
        "email":"biagonzaless@b.com",
        "password":"pastelgoiabada"
    };

    $scope.signIn = function () {
        console.log($scope.user);
    }

}]);