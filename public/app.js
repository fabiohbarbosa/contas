var app = angular.module('contas', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    function route(url, templateUrl, controller) {
        $routeProvider.when(url,
            {
                templateUrl: templateUrl,
                controller: controller
            });
    }
    route('/teste', 'teste.html');
}]);