var app = angular.module('contas', ['ngRoute', 'ngCookies', 'ngResource', 'ui.tree', 'ui.bootstrap']);

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

app.run(['$route', '$rootScope', '$location', '$cookies', function($route, $rootScope, $location, $cookies) {

    /* -------------------------------
     * Authentication
     * -------------------------------
     */
    $rootScope.$on( '$routeChangeStart', function(event, next, current) {
        var login = $cookies.get(Util.COOKIES.LOGIN);
        if (login === null || login === undefined) {
            $rootScope.isLogged = false;
            $location.path('/');
        } else {
            // Logged user is not access login page
            if (next.templateUrl !== null && next.templateUrl !== undefined) {
                if (next.templateUrl.indexOf('login') >= 0) {
                    $location.path('/category');
                }
            }
            $rootScope.isLogged = true;
        }
    });

    $rootScope.$on('httpErrorStatus403', function() {
        $cookies.remove(Util.COOKIES.LOGIN);
        $location.path('/login');
    });

}]);