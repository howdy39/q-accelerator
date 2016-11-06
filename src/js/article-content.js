class ArticleContent {
  run() {
    const url = this.getLocationHref();
    this.saveUrl(url);
  }

  getLocationHref() {
    return window.location.href;
  }

  saveUrl(url) {
    const Util = require('./util.js');
    Util.saveUrl(url);
  }
}

module.exports = ArticleContent;
