module.exports = function(app) {
    var Schema = require('mongoose').Schema;
    var user = Schema({
        email: String,
        password: String
    });
    //return db.model('user', user);
};