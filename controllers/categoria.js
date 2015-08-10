module.exports = function (app) {
    var CategoriaController = {
        findById: function(req, res) {
            var id = req.params.id;

            var categoria = {
                id: id,
                text: 'Categoria '+id
            };

            res.json(categoria);
        },
        findAll: function (req, res) {
            var categorias = [
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
            res.json(categorias);
        }
    };
    return CategoriaController;
};