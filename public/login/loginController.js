app.controller('LoginCtrl', ['$rootScope', '$scope', 'loginService', function ($rootScope, $scope, loginService) {
    $rootScope.login = true;


    $scope.welcome="Bem Vindo!";
    $scope.user= {};

    $scope.signIn = function () {

        loginService.signIn($scope.user).then(function(data) {
            if (data === true) {
                console.log("Usuario Valido!");
            } else {
                console.log("Usuario Invalido!");
            }
        });
    };

}]);