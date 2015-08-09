var express = require('express');

// full path
var path = require('path');
var rootPath = path.normalize(__dirname + '/');

// server
var app = express();

var port = 3000;
app.listen(port);
console.log('# Server running on port ' + port);

// restful
var router = express.Router();
app.use('/', router);

// inject restful controllers
var glob = require('glob');
var controllers = glob.sync(rootPath + '/app/controllers/*.js');
controllers.forEach(function (controller) {
    require(controller)(app);
});

// another routes to public project
app.use(express.static(path.join(__dirname, 'public')));
//
//app.get('*', function (req, res) {
//    res.sendFile(__dirname + '/public/index.html');
//});
