var rootPath = __dirname + '/';

module.exports = function (config) {
    config.set({
        port: 9876,
        frameworks: ['wiredep', 'jasmine'],
        colors: true,
        logLevel: config.LOG_INFO,
        files: ["../public/app.js",
            "../public/category/categoryController.js",
            "../public/category/categoryFactory.js",
            "../public/category/categoryModalController.js",
            "../public/directives/focusMeDirective.js",
            "../public/index/indexController.js",
            "../public/login/loginController.js",
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