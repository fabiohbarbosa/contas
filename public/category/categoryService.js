app.service('CategoryService', ['$q', '$cookies', 'ApiFactory', function ($q, $cookies, apiFactory) {
    this.findAll = function () {
        var deferred = $q.defer();
        return apiFactory.get('api/category/').then(function(httpSuccess) {
            if (httpSuccess.status == 200) {
                deferred.resolve(httpSuccess.data);
            }
            return deferred.promise;
        });
    };
}]);