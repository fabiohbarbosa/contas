app.service('CategoryService', ['$q', '$cookies', 'RestClient', function ($q, $cookies, restClient) {
    this.findAll = function(success, error) {
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
        restClient.get('api/category/', fctSuccess, fctError);
    };

    this.post = function(category, success, error) {
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
        restClient.post('api/category/', category, fctSuccess, fctError);
    };

}]);