const BACKGROUND_DIR = './src/background/';
const CONTENT_SCRIPTS_DIR = './src/content_scripts/';
const COMPONENTS_DIR = './src/components/';

module.exports = {
  entry: {
    'background/background': ['babel-polyfill', BACKGROUND_DIR + 'background.js'],
    'content_scripts/article-content': ['babel-polyfill', CONTENT_SCRIPTS_DIR + 'article-content-main.js'],
    'content_scripts/popular-items-content': ['babel-polyfill', CONTENT_SCRIPTS_DIR + 'popular-items-content.js'],
    'js/settings': ['babel-polyfill', COMPONENTS_DIR + 'settings.js'] // components/settings.js -> js/settings.js
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