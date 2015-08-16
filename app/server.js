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
app.use(express.static(path.join(rootPath, '../public')));

// rest project - routes JSON
app.use(function(req, res, next) {
    res.set({
        'Content-Type': 'application/json'
    });
    next();
});

var router = express.Router();
app.use(router);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// load server files
var load = require('express-load');
load('app/models')
    .then('app/controllers')
    .then('app/routes')
    .into(app);