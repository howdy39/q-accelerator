/* eslint-env node */

const path = require('path');

const BACKGROUND_DIR = './src/background/';
const CONTENT_SCRIPTS_DIR = './src/content_scripts/';
const COMPONENTS_DIR = './src/components/';

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    'background/background': BACKGROUND_DIR + 'background.js',
    'content_scripts/all-content': CONTENT_SCRIPTS_DIR + 'all-content.js',
    'content_scripts/article-content': CONTENT_SCRIPTS_DIR + 'article-content.js',
    'content_scripts/drafts-new-content': CONTENT_SCRIPTS_DIR + 'drafts-new-content.js',
    'js/settings': COMPONENTS_DIR + 'settings.js' // components/settings.js -> js/settings.js
  },
  output: {
    path: 'extension',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      },
    ]
  },
  devtool: 'source-map'
};
