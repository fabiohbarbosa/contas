module.exports = function(app) {
    var user = app.controllers.user;
    var endpoint = '/api/user/';

    app.post(endpoint+"sign_in/", user.signIn);
    app.post(endpoint+"sign_up/", user.signUp);
    app.post(endpoint+"sign_out/", user.signOut);
};