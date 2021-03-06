/**
 * Created by fabio on 08/08/15.
 */

var rootPath = __dirname+'/';
var GULP_FILE = 'gulpfile.js';

var SOURCES_JS_CLIENT = [
    rootPath+'public/**/*.js',
    '!'+rootPath+'public/bower_components/**/*.js',
];

var SOURCES_JS_SERVER = [
    rootPath+'server.js',
    rootPath+'app/**/*.js'
];

var SOURCES_HTML = [
    rootPath+'public/**/*.html'
];

var SOURCES_CSS = [
    rootPath+'public/**/*.css',
    '!'+rootPath+'public/bower_components/**/*.css'
];

var SOURCES_SPEC = [
    rootPath+'tests/**/*.js'
];

var KARMA_CONF_FILE = rootPath + 'tests/karma.conf.js';
var SPEC_DIRECTORY = rootPath + 'tests/';
var SPEC_FILES = '"./**/*Spec.js"';

// server
var gulp = require('gulp');
var argv = require('yargs').argv;

var server = require('gulp-express');
gulp.task('server', ['jshint', 'inject'], function () {
    server.run([rootPath+'app/server.js']);

    // watch
    gulp.watch(SOURCES_JS_CLIENT, function(event) {
        gulp.start('jshint', 'inject');
        server.notify(event);
    });
    gulp.watch(SOURCES_HTML, function(event) {
        server.notify(event);
    });
    gulp.watch(SOURCES_CSS, function(event) {
        gulp.start('inject');
        server.notify(event);
    });
    gulp.watch(SOURCES_JS_SERVER, function(event) {
        gulp.start('server');
        server.notify(event);
    });
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    var JSHINT_JS = SOURCES_JS_CLIENT.concat(SOURCES_JS_SERVER).concat(GULP_FILE).concat(SOURCES_SPEC);

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
        directory: rootPath+'public/bower_components',
        exclude: rootPath+'public/bower_components/angular-mocks/angular-mocks.js'
    };

    return gulp.src(rootPath+'public/index.html')
        .pipe(inject(gulp.src(SOURCES_JS_CLIENT), options))
        .pipe(inject(gulp.src(SOURCES_CSS), options))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(rootPath+'public'));
});

gulp.task('inject-karma', function () {
    // Inject all SOURCE_JS_CLIENT files
    function injectAppJsFiles(filepath, i, length) {
        return '"..' + filepath + '"' + (i + 1 < length ? ',\n            ' : '');
    }

    // Inject SPEC files
    function injectSpecFiles(i, length, extracted) {
        if (i + 1 == length) {
            extracted = extracted + ',\n            ' + SPEC_FILES;
        }
        return extracted;
    }

    gulp.src(KARMA_CONF_FILE)
        .pipe(inject(gulp.src(SOURCES_JS_CLIENT, {read: false}), {
            starttag: 'files: [',
            endtag: ']',
            transform: function (filepath, file, i, length) {
                var extracted = injectAppJsFiles(filepath, i, length);
                return injectSpecFiles(i, length, extracted);
            }
        })).pipe(gulp.dest(SPEC_DIRECTORY));
});

// Karma
var Server = require('karma').Server;
gulp.task('test', ['inject-karma'], function (done) {
    var singleRun, browsers;
    if (argv.d) { // argument to debug
        singleRun = false;
        browsers = ['Chrome'];
    } else {
        singleRun = true;
        browsers = ['PhantomJS'];
    }

    new Server({
        browsers: browsers,
        configFile: KARMA_CONF_FILE,
        singleRun: singleRun
    }, function(karmaExitStatus) {
        if (karmaExitStatus) {
            process.exit(1);
        }
        done();
    }).start();
});

gulp.task('arg', function() {
    console.log('Arg: '+argv.a);
});