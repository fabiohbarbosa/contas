app.service('LoginService', ['$q', '$cookies', 'ApiFactory', function ($q, $cookies, apiFactory) {
    this.signIn = function (user) {
        var deferred = $q.defer();
        return apiFactory.post('api/user/sign_in/', user).then(function(httpSuccess) {
            if (httpSuccess.status == 204) {
                $cookies.put(Util.COOKIES.LOGIN, user.email, {secure : false} );
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;
        });
    };


    this.signOut = function (user) {
        var deferred = $q.defer();
        $cookies.remove(Util.COOKIES.LOGIN);
        return apiFactory.post('api/user/sign_out/').then(function(httpSuccess) {
            if (httpSuccess.status == 204) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;
        });
    };

}]);