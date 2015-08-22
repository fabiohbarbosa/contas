module.exports = function (app) {
    return {
        signIn: function(req, res) {
            var login = req.body;
            res.status(204).send();
        },
        signUp : function(req, res) {
            var login = req.body;
            res.status(204).send();
        },
        signOut: function(req, res) {
            var login = req.body;
            res.status(204).send();
        }
    };
};