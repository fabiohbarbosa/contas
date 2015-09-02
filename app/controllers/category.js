module.exports = function (app) {
    var Category = app.models.category;
    var validators = app.utils.validators;

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
            var categories = req.body;

            categories.forEach(function(category) {
                var newCategories = new Category(category);
                newCategories.save(function (err, data) {
                    validators.callbackErr(err, res, category);
                });
            });
            res.status(204).send();
        }
    };
};