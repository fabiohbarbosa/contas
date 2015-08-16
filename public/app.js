var app = angular.module('contas', ['ngRoute', 'ui.tree', 'ui.bootstrap', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {

    function route(url, templateUrl, controller) {
        $routeProvider.when(url,
            {
                templateUrl: templateUrl,
                controller: controller
            });
    }

    route('/',          'login/login.html');
    route('/login',     'login/login.html');

    route('/category',  'category/category.html');
}]);