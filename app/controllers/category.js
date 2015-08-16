module.exports = function (app) {
    return {
        findById: function(req, res) {
            var id = req.params.id;

            var category = {
                id: id,
                name: 'Categoria '+id
            };

            res.json(category);
        },
        findAll: function (req, res) {
            var categories = [
                {
                    name: 'Receita',
                    category: [
                        {
                            name: 'Salário',
                        }
                    ]
                },
                {
                    name: 'Alimentação',
                    category: [
                        {
                            name: 'Restaurantes',
                            category: [
                                {
                                    name: 'Almoço'
                                },
                                {
                                    name: 'Jantar'
                                }
                            ]
                        },
                        {
                            name: 'Padaria'
                        },
                        {
                            name: 'Lanches'
                        },
                        {
                            name: 'Supermercados'
                        },
                        {
                            name: 'Pizza'
                        }
                    ]

                }
            ];
            res.json(categories);
        },
        save : function(req, res) {
            var category = req.body;
            res.status(204).send();
        }
    };
};