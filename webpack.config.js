const JS_DIR = './dest/src/js/';

module.exports = {
  entry: {
    'settings': JS_DIR + 'settings.js',
    'article-content': JS_DIR + 'article-content-main.js',
    'popular-items-content': JS_DIR + 'popular-items-content.js'
  },
  output: {
    path: 'extension/js',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
};