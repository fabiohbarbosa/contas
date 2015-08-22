app.service('LoginService', ['$q', 'ApiFactory', function ($q, apiFactory) {
    this.singIn = function (user) {
        var deferred = $q.defer();
        return apiFactory.post('api/user/sign_in', user).then(function(httpSuccess) {
            if (httpSuccess.status == 200 || httpSuccess.status == 204) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
            return deferred.promise;
        });
    };
}]);