import Util from '../../js/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class SaveHistoryContent {

  run() {
    const handler = new ArticleDomHandler();
    const article = handler.getArticle();

    const url = article.url;
    const title = article.title;
    const date = (new Date()).getTime();
    Util.saveHistory(url, title, date);
  }
}
