app.factory('Category', ['$resource', function($resource) {
    return $resource('/api/category/:id');
}]);