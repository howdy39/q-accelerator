const BACKGROUND_DIR = './src/background/';
const CONTENT_SCRIPTS_DIR = './src/content_scripts/';
const COMPONENTS_DIR = './src/components/';

module.exports = {
  entry: {
    'background/background': BACKGROUND_DIR + 'background.js',
    'content_scripts/article-content': CONTENT_SCRIPTS_DIR + 'article-content.js',
    'content_scripts/article-list-stream-content': CONTENT_SCRIPTS_DIR + 'article-list-stream-content.js',
    'content_scripts/article-list-tags-content': CONTENT_SCRIPTS_DIR + 'article-list-tags-content.js',
    'content_scripts/drafts-new-content': CONTENT_SCRIPTS_DIR + 'drafts-new-content.js',
    'content_scripts/popular-items-content': CONTENT_SCRIPTS_DIR + 'popular-items-content.js',
    'js/settings': COMPONENTS_DIR + 'settings.js' // components/settings.js -> js/settings.js
  },
  output: {
    path: 'extension',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: [
          'html-loader'
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      },
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devtool: 'source-map'
};