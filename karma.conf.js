// Karma configuration
// Generated on Sun Dec 25 2016 00:21:59 GMT+0900 (JST)

module.exports = function (config) {
  var webpackConfig = require('./webpack.config');

  config.set({

    basePath: '',
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      {pattern: 'test/**/*.spec.js', watched: false}
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack']
    },
    webpack: {
      devtool: 'none',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    logLevel: config.LOG_INFO
  });
};
