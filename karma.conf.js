/*global process*/

module.exports = function (config) {
  var webpackConfig = require('./webpack.config');

  config.set({

    basePath: '',
    browsers: [process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
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
