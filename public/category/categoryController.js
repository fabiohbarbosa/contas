app.controller('CategoryCtrl', ['$rootScope', '$scope', '$modal', '$log', 'CategoryService', function ($rootScope, $scope, $modal, $log, categoryService) {

    $rootScope.isLogged = true;

    //~--
    //~-- PRIVATE METHODS
    //~--
    this.loadCategories = function() {
        categoryService.findAll().then(function(data) {
            $scope.categories = data;
        });
    };

    this.createModal = function(category) {
        return $modal.open({
            animation: true,
            templateUrl: 'categoryModal.html',
            controller: 'ModalCategoryCtrl',
            size: 'sm',
            resolve: {
                category: function () {
                    return category;
                }
            }
        });
    };

    this.addCategoryInArray = function(categories, newCategory) {
        this.pushCategoryInArray(categories, newCategory);
    };

    this.addSubCategoryInArray = function(scope, newCategory) {
        var category = scope.$modelValue;
        if (!category) {
            return;
        }
        if (!category.category) {
            category.category = [];
        }
        this.pushCategoryInArray(category.category, newCategory);
    };

    // push category in array
    this.pushCategoryInArray = function(categories, newCategory) {
        if (!categories || !newCategory) {
            return;
        }
        categories.push({
            name: newCategory,
            category: []
        });
    };

    // for unit tests
    var $controller = this;

    //~--
    //~-- SCOPE FUNCTIONS
    //~--
    // toggle
    $scope.collapsed = true;
    $scope.toggleCategory = function (category) {
        $scope.collapsed = !$scope.collapsed;
        category.toggle();
    };

    // category
    $scope.addCategory = function (categories) {
        var modalInstance = $controller.createModal();
        modalInstance.result.then(function (newCategory) {
            $controller.addCategoryInArray(categories, newCategory);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // subcategory
    $scope.addSubCategory = function (scope) {
        var modalInstance = $controller.createModal(null);
        modalInstance.result.then(function (newCategory) {
            $controller.addSubCategoryInArray(scope, newCategory);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // edit category
    $scope.editCategory = function (scope) {
        var category = scope.$modelValue;

        var modalInstance = $controller.createModal(category);

        modalInstance.result.then(function (newCategory) {
            category.name = newCategory;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });


    };
    // remove category
    $scope.removeCategory = function (category) {
        category.remove();
    };

    // init
    this.loadCategories();

}]);