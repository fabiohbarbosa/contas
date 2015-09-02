app.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'LoginService', function ($rootScope, $scope, $location, service) {
    $rootScope.isLogged = false;

    $scope.welcome="Bem Vindo!";
    $scope.user= {};

    $scope.signIn = function() {
        var fctSuccess = function (success) {
            $location.path('/category');
        };

        var fctError = function (error) {
            console.log("Usuario Invalido!");
        };

        service.signIn($scope.user,fctSuccess, fctError);
    };

    $scope.signOut = function() {
        service.signOut();
    };

}]);