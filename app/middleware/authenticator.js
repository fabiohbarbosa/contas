exports.isAuthenticated = function(req, res, next) {
    var signUp = '/api/user/sign_up/';
    var signIn = '/api/user/sign_in/';
    var signOut = '/api/user/sign_out/';

    if (req.url != signUp && req.url != signIn && req.url != signOut) {
        if (!req.session.user) {
            res.status(403).send();
        } else {
            next();
        }
    } else {
        next();
    }
};