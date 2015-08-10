/**
 * Created by fabio on 08/08/15.
 */

'use strict';

var SOURCES_JS_CLIENT = ['public/**/*.js', '!public/bower_components/**/*.js'];
var SOURCES_JS_SERVER = ['server.js', 'controllers/**/*.js', 'models/**/*.js', 'routes/**/*.js'];

var SOURCES_HTML = ['public/**/*.html'];
var SOURCES_CSS = ['public/**/*.css', '!public/bower_components/**/*.css'];

// server
var gulp = require('gulp');
var server = require('gulp-express');
gulp.task('server', ['jshint', 'inject'], function () {
    server.run(['server.js']);

    // watch
    gulp.watch(SOURCES_JS_CLIENT, ['jshint', 'inject']);
    gulp.watch(SOURCES_HTML, server.notify);
    gulp.watch(SOURCES_CSS, server.notify);
    gulp.watch(SOURCES_JS_SERVER, ['server']);
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    // add server.js in array of js
    var JSHINT_JS = SOURCES_JS_CLIENT.concat(SOURCES_JS_SERVER);

    return gulp.src(JSHINT_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Inject
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
gulp.task('inject', function () {
    var options = {
        read: false,
        ignorePath: ['public'],
        addRootSlash: false
    };

    var wiredepOptions = {
        directory: 'public/bower_components'
    };

    return gulp.src('./public/index.html')
        .pipe(inject(gulp.src(SOURCES_JS_CLIENT), options))
        .pipe(inject(gulp.src(SOURCES_CSS), options))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest('./public'));
});