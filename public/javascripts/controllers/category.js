app.controller('CategoriaCtrl', ['$scope', '$modal', '$log', 'Category', function ($scope, $modal, $log, Category) {

    // init
    loadCategories();

    $scope.categories = [];

    function loadCategories() {
        Category.query().$promise.then(function(data){
            $scope.categories = data;
        });
    }

    // toggle
    $scope.collapsed = true;
    $scope.toggleCategory = function (category) {
        $scope.collapsed = !$scope.collapsed;
        category.toggle();
    };

    // Modal
    function createModal(categoryName) {
        var categoryName = 'Fabio Category';

        return $modal.open({
            animation: true,
            templateUrl: 'categoryModal.html',
            controller: 'ModalCategoryCtrl',
            size: 'sm',
            resolve: {
                categoryName: function () {
                    return categoryName;
                }
            }
        });
    }

    // category
    $scope.addCategory = function(categories) {
        var modalInstance = createModal();
        modalInstance.result.then(function (newCategory) {
            addCategoryInArray(categories, newCategory);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function addCategoryInArray(categories, newCategory) {
        pushCategoryInArray(categories, newCategory);
    }

    // subcategory
    $scope.addSubCategory = function (scope) {
        var modalInstance = createModal();
        modalInstance.result.then(function (newCategory) {
            addSubCategoryInArray(scope, newCategory);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function addSubCategoryInArray(scope, newCategory) {
        var nodeData = scope.$modelValue;
        if (!nodeData.category) {
            nodeData.category = [];
        }
        pushCategoryInArray(nodeData.category, newCategory);
    }

    // push category in array
    function pushCategoryInArray(categories, newCategory) {
        categories.push({
            name: newCategory,
            category: []
        });
    }

    // edit category
    $scope.editCategory = function(scope) {
        var nodeData = scope.$modelValue;

        createModal(nodeData.name);
    };
    // remove category
    $scope.removeCategory = function (category) {
        category.remove();
    };

}]);

app.controller('ModalCategoryCtrl', function ($scope, $modalInstance, categoryName) {
    $scope.ok = function () {
        $modalInstance.close($scope.newCategory);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});