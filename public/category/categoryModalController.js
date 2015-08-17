app.controller('ModalCategoryCtrl', function ($scope, $modalInstance, category) {

    // if editing category
    if (category && category.name) {
        $scope.newCategory = category.name;
    }

    $scope.ok = function () {
        $modalInstance.close($scope.newCategory);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});