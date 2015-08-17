var rootPath = __dirname + '/';

module.exports = function (config) {
    config.set({
        port: 9876,
        frameworks: ['wiredep', 'jasmine'],
        colors: true,
        logLevel: config.LOG_INFO,
        files: ["../public/app.js",
            "../public/category/category.controller.js",
            "../public/category/category.factory.js",
            "../public/category/category.modal.controller.js",
            "../public/directives/focusme.directive.js",
            "../public/index/index.controller.js",
            "../public/login/login.controller.js",
                "./**/*Spec.js"],
        browsers: ['PhantomJS'],
        reporters: ['progress'],
        autoWatch: true,
        singleRun: false,
        wiredep: {
            dependencies: true
        }
    });
};