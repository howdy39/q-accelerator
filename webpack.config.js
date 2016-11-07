module.exports = {
  entry: {
    'article-content': './dest/src/js/article-content-main.js',
    'popular-items-content': './dest/src/js/popular-items-content.js'
  },
  output: {
    path: 'extension/js',
    filename: '[name].js'
  }
};