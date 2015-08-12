var app = angular.module('contas', ['ngRoute', 'ui.tree', 'ui.bootstrap', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {

    function route(url, templateUrl, controller) {
        $routeProvider.when(url,
            {
                templateUrl: templateUrl,
                controller: controller
            });
    }
    route('/category', 'views/category.html');
    route('/login', 'views/login.html');

}]);