module.exports = function(app) {
    var categoria = app.controllers.categoria;
    app.get('/categoria/:id', categoria.findById);
    app.get('/categoria/', categoria.findAll);
};