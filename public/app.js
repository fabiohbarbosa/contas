var app = angular.module('contas', ['ngRoute', 'ui.tree', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {

    function route(url, templateUrl, controller) {
        $routeProvider.when(url,
            {
                templateUrl: templateUrl,
                controller: controller
            });
    }
    route('/categoria', 'views/categoria.html');
}]);