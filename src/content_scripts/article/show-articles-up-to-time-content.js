import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class ShowArticlesUpToTimeContent {

  run() {
    const handler = new ArticleDomHandler();
    handler.showArticleUpdateTime();
    Util.infoLog('記事の更新時間を表示');
  }

}
