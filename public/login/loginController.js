app.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'LoginService', function ($rootScope, $scope, $location, loginService) {
    $rootScope.isLogged = false;

    $scope.welcome="Bem Vindo!";
    $scope.user= {};

    $scope.signIn = function () {
        loginService.signIn($scope.user).then(function(data) {
            if (data === true) {
                $location.path('/category');
            } else {
                console.log("Usuario Invalido!");
            }
        });
    };

    $scope.signOut = function() {
        loginService.signOut();
        $location.path('/login');
    };

}]);