app.controller('CategoriaCtrl', ['$scope', '$modal', '$log', function ($scope, $modal, $log) {

    // Category
    $scope.categories = [
        {
            id: '1',
            name: 'Receita',
            category: [
                {
                    id: '2',
                    name: 'Salário'
                }
            ]
        },
        {
            id: '3',
            name: 'Alimentação',
            category: [
                {
                    id: '4',
                    name: 'Restaurantes'
                },
                {
                    id: '5',
                    name: 'Padaria'
                },
                {
                    id: '6',
                    name: 'Lanches'
                },
                {
                    id: '7',
                    name: 'Supermercados'
                },
                {
                    id: '8',
                    name: 'Pizza'
                }
            ]

        }
    ];

    $scope.removeCategory = function (category) {
        category.remove();
    };

    $scope.toggleCategory = function (category) {
        $scope.collapsed = !$scope.collapsed;
        category.toggle();
    };

    $scope.newSubItem = function (scope) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'categoryModal.html',
            controller: 'ModalCategoryCtrl',
            size: 'sm'
        });

        modalInstance.result.then(function (newCategory) {
            addCategory(scope, newCategory);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function addCategory(scope, newCategory) {
        var nodeData = scope.$modelValue;
        if (!nodeData.category) {
            nodeData.category = [];
        }
        nodeData.category.push({
            id: nodeData.id * 10 + nodeData.category.length,
            name: newCategory,
            category: []
        });
    }

}]);

app.controller('ModalCategoryCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.newCategory);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});