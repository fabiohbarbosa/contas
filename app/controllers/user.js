module.exports = function (app) {
    var User = app.models.user;
    var validators = app.utils.validators;

    return {
        signIn: function (req, res) {
            var user = req.body;
            User.find({email: user.email}, function(err, data) {
                validators.callbackErr(err, res, user);
                if (data.length > 0) {
                    var userDatabase = data[0];
                    if (user.password == userDatabase.password) {
                        req.session.user = userDatabase;
                        res.status(204).send();
                    }
                }
                res.status(403).send();
            });
        },

        signUp: function (req, res) {
            var user = req.body;
            var newUser = new User(user);
            newUser.save(function (err, data) {
                validators.callbackErr(err, res, user);
                //req.session.user = data;
                res.status(204).send();
            });
        },

        signOut: function (req, res) {
            req.session.destroy();
            res.status(204).send();
        }
    };
};