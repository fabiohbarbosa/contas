app.factory('RestClient', ['$rootScope', '$http', function ($rootScope, $http) {
    var restClient = {};

    function fctSuccess(success) {
        return function (data, status) {
            if (success) {
                var httpSuccess = { 'data': data, 'status': status };
                success(httpSuccess);
            }
        };
    }

    function fctError(error) {
        return function (data, status) {
            var httpError = { 'data': data, 'status': status };
            if (error) {
                error(httpError);
            }
            // handler to logout when server session is destroyed
            if (httpError.status == 403) {
                $rootScope.$broadcast('httpErrorStatus403', httpError);
            }
        };
    }

    restClient.get = function (url, success, error) {
        return $http.get(url).success(fctSuccess(success)).error(fctError(error));
    };

    restClient.post = function (url, body, success, error) {
        return $http.post(url, body).success(fctSuccess(success)).error(fctError(error));
    };

    return restClient;
}]);