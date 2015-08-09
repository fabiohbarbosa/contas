/**
 * Created by fabio on 08/08/15.
 */

'use strict';

var SOURCES_JS = ['public/**/*.js', '!public/bower_components/**/*.js'];
var SOURCES_HTML = ['public/**/*.html'];
var SOURCES_CSS = ['public/**/*.css'];

// server
var gulp = require('gulp');
var server = require('gulp-express');
gulp.task('server', ['jshint', 'inject'], function () {
    server.run(['server.js']);
    gulp.watch(SOURCES_JS, ['jshint', 'inject']);
    gulp.watch(SOURCES_HTML, server.notify);
    gulp.watch('server.js', ['server']);
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    return gulp.src('server.js', SOURCES_JS)
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
        .pipe(inject(gulp.src(SOURCES_JS), options))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest('./public'));
});