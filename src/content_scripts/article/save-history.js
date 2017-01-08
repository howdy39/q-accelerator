import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class SaveHistoryContent {

  run() {
    const handler = new ArticleDomHandler();

    const url = handler.getUrl();
    const title = handler.getTitle();
    const date = (new Date()).getTime();
    Util.saveHistory(url, title, date);
  }

}
