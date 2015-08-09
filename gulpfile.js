/**
 * Created by fabio on 08/08/15.
 */

'use strict';

var SOURCES_JS = ['public/**/*.js', '!public/bower_components/**/*.js'];

var gulp = require('gulp');
var server = require('gulp-express');
var jshint = require('gulp-jshint');

gulp.task('server', ['jshint', 'inject'], function () {
    server.run(['server.js']);
    gulp.watch(SOURCES_JS, ['jshint', 'inject']);
    gulp.watch('server.js', ['server']);
});

gulp.task('jshint', function () {
    return gulp.src('server.js', SOURCES_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//--------------------------------
// INJECT
//--------------------------------
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

// Inject
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