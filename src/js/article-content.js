import Util from './util';

class ArticleContent {
  run() {
    const url = this.getLocationHref();
    this.saveUrl(url);
  }

  getLocationHref() {
    return window.location.href;
  }

  saveUrl(url) {
    Util.saveUrl(url);
  }
}

module.exports = ArticleContent;
