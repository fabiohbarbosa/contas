app.controller('TesteController', ['$scope', '$location', function ($scope, $location) {

    $scope.categorias = [
        {
            text: 'Categoria 1'
        }, {
            text: 'Categoria 2',
            categoria: [
                {
                    text: 'Sub-categoria 2.1'
                },
                {
                    text: 'Sub-categoria 2.2',
                    categoria: [
                        {
                            text: 'Sub-sub-categoria 2.2.1'
                        }, {
                            text: 'Sub-sub-categoria 2.2.2'
                        }
                    ]
                }
            ]
        }, {
            text: 'Categoria 3'
        }
    ];

    /************************************/
    /************************************/
    /************************************/
    /************************************/
    /************************************/
    /************************************/

    var tmpList = [];

    for (var i = 1; i <= 6; i++){
        tmpList.push({
            text: 'Item ' + i,
            value: i
        });
    }

    $scope.list = tmpList;


    $scope.sortingLog = [];

    $scope.sortableOptions = {
        update: function(e, ui) {
            var logEntry = tmpList.map(function(i){
                return i.value;
            }).join(', ');
            $scope.sortingLog.push('Update: ' + logEntry);
        },
        stop: function(e, ui) {
            // this callback has the changed model
            var logEntry = tmpList.map(function(i){
                return i.value;
            }).join(', ');
            $scope.sortingLog.push('Stop: ' + logEntry);
        }
    };

}]);