module.exports = {
  entry: {
    'settings': './dest/src/js/settings.js',
    'article-content': './dest/src/js/article-content-main.js',
    'popular-items-content': './dest/src/js/popular-items-content.js'
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