import Util from '../../js/util';

export default class ArticleContent {

  run() {
    const url = this.getLocationHref();
    const title = this.getTitle();
    const date = (new Date()).getTime();
    Util.saveHistory(url, title, date);
  }

  getLocationHref() {
    return window.location.href;
  }

  getTitle() {
    return document.querySelector('.col-sm-9 > h1').textContent;
  }
}
