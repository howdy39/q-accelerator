const BACKGROUND_DIR = './src/background/';
const JS_DIR = './src/js/';

module.exports = {
  entry: {
    'background/background': ['babel-polyfill', BACKGROUND_DIR + 'background.js'],
    'js/settings': ['babel-polyfill', JS_DIR + 'settings.js'],
    'js/article-content': ['babel-polyfill', JS_DIR + 'article-content-main.js'],
    'js/popular-items-content': ['babel-polyfill', JS_DIR + 'popular-items-content.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: 'extension',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devtool: 'source-map'
};