var express = require('express');

// full path
var path = require('path');
var rootPath = path.normalize(__dirname + '/');

// server
var app = express();

app.use(require('connect-livereload')());

var port = 3000;
app.listen(port);
console.log('# Server running on port ' + port);

// public project - routes HTTP
app.use(express.static(path.join(rootPath, 'public')));

// rest project - routes JSON
app.use(function(req, res, next) {
    res.set({
        'Content-Type': 'application/json'
    });
    next();
});

var router = express.Router();
app.use(router);

// load server files
var load = require('express-load');
load('models')
    .then('controllers')
    .then('routes')
    .into(app);
