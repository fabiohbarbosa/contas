app.factory('ApiFactory', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
    /**
     * Broadcast httpError to process in index.controller.js
     * @param data
     * @param status
     * @param headers
     * @param config
     */
    var httpError = function (data, status, headers, config) {
        var httpError = {
            data: data, status: status, headers: headers, config: config
        };

        // handler para exceptions não tratadas
        if (httpError.status == 500) {
            $rootScope.$broadcast('httpErrorEvent', httpError);
        }

        return httpError;
    };

    var httpSuccess = function(data, status) {
        return { 'data': data, 'status': status };
    };

    return {
        get: function (endp) {
            endp = URL + endp;
            $http({
                method: 'GET',
                url: endp,
                responseType: 'json'
            }).success(function (data, status, headers, config) {
                var httpSuccess = httpSuccess(data, status);
                deferred.resolve(httpSuccess);
            }).error(function (data, status, headers, config) {
                httpError(data, status, headers, config);
                deferred.reject(data);
            });
            return deferred.promise;
        },
        post: function (endp, data) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: endp,
                data: data,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (data, status, headers, config) {
                deferred.resolve(httpSuccess(data, status));
            }).error(function (data, status, headers, config) {
                deferred.resolve(httpError(data, status, headers, config));
            });
            return deferred.promise;
        },
        put: function (endp, data) {
            endp = URL + endp;
            $http({
                method: 'PUT',
                url: endp,
                responseType: 'json',
                data: XML.stringify(data),
                headers: {
                    'Content-Type': 'application/xml'
                }
            }).success(function (data, status, headers, config) {
                var httpSuccess = httpSuccess(data, status);
                deferred.resolve(httpSuccess);
                return httpSuccess;
            }).error(function (data, status, headers, config) {
                httpError(data, status, headers, config);
                deferred.reject(data);
            });
        },
        delete: function (endp) {
            endp = URL + endp;
            $http({
                method: 'DELETE',
                url: endp,
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/xml'
                }
            }).success(function (data, status, headers, config) {
                var httpSuccess = httpSuccess(data, status);
                deferred.resolve(httpSuccess);
            }).error(function (data, status, headers, config) {
                httpError(data, status, headers, config);
                deferred.reject(data);
            });
            return deferred.promise;
        }
    };
}]);