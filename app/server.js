// full path
var path = require('path');
var rootPath = path.normalize(__dirname + '/');

/* -------------------------------
 * SERVER
 * -------------------------------
 */
var express = require('express');
var http = require('http');
var livereload = require('connect-livereload');

var app = express();
app.use(livereload());

var httpPort = 3000;
http.createServer(app).listen(httpPort);

// favicon
var favicon = require('express-favicon');
app.use(favicon(rootPath + '../public/favicon.ico'));

// public project - routes HTTP
app.use(express.static(path.join(rootPath, '../public')));

// json
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// session
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
    secret: '1c967087-10f7-47b0-9fda-bd1770a5fcb1',
    name: 'ffbf06fa-5514-4dbc-b758-87c67fd09551',
    proxy: true,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: null
    }
}));

/* -------------------------------
 * MONGO
 * -------------------------------
 */
var Mongoose = require('mongoose');
global.db = Mongoose.connect('mongodb://localhost/contas');

app.Mongoose = Mongoose;
app.MongooseValidators = require('mongoose-validators');

/* -------------------------------
 * REST API
 * -------------------------------
 */
var authenticator = require('./middleware/authenticator');

app.use(function(req, res, next) {
    res.set({
        'Content-Type': 'application/json'
    });
    next();
});

app.use(authenticator.isAuthenticated);

var router = express.Router();
app.use(router);

// load server files
var load = require('express-load');
load('utils', {cwd: 'app'})
    .then('models', {cwd: 'app'})
    .then('controllers', {cwd: 'app'})
    .then('routes', {cwd: 'app'})
    .into(app);

console.log('# Server running on port ' + httpPort);