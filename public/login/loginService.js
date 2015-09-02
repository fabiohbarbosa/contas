app.service('LoginService', ['$q', '$cookies', '$location', 'RestClient', function ($q, $cookies, $location, restClient) {

    this.signIn = function(user, success, error) {
        var fctSuccess = function (data) {
            $cookies.put(Util.COOKIES.LOGIN, user.email, {secure: false});
            if (success) {
                success(data);
            }
        };
        var fctError = function (data) {
            if (error) {
                error(data);
            }
        };
        restClient.post('api/user/sign_in/', user, fctSuccess, fctError);
    };

    this.signOut = function(success, error) {
        $cookies.remove(Util.COOKIES.LOGIN);
        $location.path('/login');

        var fctSuccess = function (data) {
            if (success) {
                success(data);
            }
        };
        var fctError = function (data) {
            if (error) {
                error(data);
            }
        };
        restClient.post('api/user/sign_out/', '', fctSuccess, fctError);
    };
}]);