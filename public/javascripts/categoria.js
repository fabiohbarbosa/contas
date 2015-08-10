app.controller('categoriaController', ['$scope', '$location', function ($scope, $location) {

    $scope.categorias = [
        {
            id: '1',
            text: 'Categoria 1'
        }, {
            id: '2',
            text: 'Categoria 2',
            categoria: [
                {
                    id: '4',
                    text: 'Sub-categoria 2.1'
                },
                {
                    id: '5',
                    text: 'Sub-categoria 2.2',
                    categoria: [
                        {
                            id: '6',
                            text: 'Sub-sub-categoria 2.2.1'
                        }, {
                            id: '7',
                            text: 'Sub-sub-categoria 2.2.2'
                        }
                    ]
                }
            ]
        },
        {
            id: '3',
            text: 'Categoria 3'
        }
    ];

    /************************************/
    /************************************/
    /************************************/
    /************************************/
    /************************************/
    /************************************/

    $scope.$watchCollection('sortingLog', function(newValue, oldValue) {
        console.log(categoriasUpdated);
        console.log($scope.categorias);
    });

    var categoriasUpdated = [];

    $scope.sortingLog = [];

    $scope.sortableOptions = {
        stop: function (e, ui) {
            // this callback has the changed model
            var logEntry = $scope.categorias.map(function (i) {
                return i.id;
            }).join(', ');
            $scope.sortingLog.push(logEntry);
            categoriasUpdated = logEntry;
        }
    };

}]);