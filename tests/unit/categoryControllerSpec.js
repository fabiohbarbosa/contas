describe('TestCategoryCtrl', function () {

    $controller = null;
    $scope = null;
    $rootScope = null;

    beforeEach(function () {
        module('contas');
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $scope = $rootScope.$new();

        $controller = _$controller_('CategoryCtrl', {
            $scope: $scope,
            $modal: null,
            $log: null,
            Category: CategoryMock
        });
    }));

    // $scope.categories
    it('expect categories length zero', function () {
        expect(0).toBe($scope.categories.length);
    });

    // $scope.collapsed
    it('toggle collapsed variable - TRUE test', function () {
        var category = {
            toggle: function() {}
        };
        spyOn(category, 'toggle');

        $scope.collapsed = true;
        $scope.toggleCategory(category);

        expect(false).toBe($scope.collapsed);
        expect(category.toggle).toHaveBeenCalled();

    });

    it('toggle collapsed variable - FALSE test', function () {
        var category = {
            toggle: function() {}
        };
        spyOn(category, 'toggle');

        $scope.collapsed = false;
        $scope.toggleCategory(category);

        expect(true).toBe($scope.collapsed);
        expect(category.toggle).toHaveBeenCalled();
    });

    var CategoryMock = {
        query: function() {
            var deferred = $q.defer();
            return {$promise: deferred.promise};
        }
    };

});