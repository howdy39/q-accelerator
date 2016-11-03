module.exports = {
  entry: {
    'article-content': './src/js/article-content.js',
    'popular-items-content': './src/js/popular-items-content.js'
  },
  output: {
    path: 'extension/js',
    filename: '[name].js'
  }
};