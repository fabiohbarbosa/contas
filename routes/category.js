module.exports = function(app) {
    var category = app.controllers.category;
    var endpoint = '/api/category/';

    app.get(endpoint+':id', category.findById);
    app.get(endpoint, category.findAll);
    app.post(endpoint, category.save);
};