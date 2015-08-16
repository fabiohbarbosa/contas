module.exports = function(config) {
    config.set({
        port: 9876,
        frameworks: ['mocha', 'chai'],
        colors: true,
        logLevel: config.LOG_INFO,
        files: [
            '../public/bower_components/jquery/dist/jquery.js',
            '../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
            '../public/bower_components/angular/angular.js',
            '../public/bower_components/angular-route/angular-route.js',
            '../public/bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            '../public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            '../public/bower_components/angular-resource/angular-resource.js',
            '../public/bower_components/angular-mocks/angular-mocks.js',
            '../public/app.js',
            '../public/**/*.controller.js',
            '../public/**/*.service.js',
            '../public/**/*.factory.js',
            '../public/**/*.directive.js',
            './**/*Spec.js'
        ],
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        autoWatch: true,
        singleRun: false
    });
};