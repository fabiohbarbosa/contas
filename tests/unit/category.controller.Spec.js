describe('TestCategoryCtrl', function () {

    var controller = null;
    $scope = null;

    beforeEach(function () {
        module('contas');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        controller = $controller('CategoryCtrl', {
            $scope: $scope
        });
    }));

    it('initially has a greeting', function () {
        assert.equal($scope.greeting, "Hello, World!!");
    });

});