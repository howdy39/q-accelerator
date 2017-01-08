import objectValues from 'object.values';
import Util from '../../common/util';
import PopularItemsDomHandler from './popular-items-dom-handler.js';

export default class MuteAlreadyReadArticleContent {

  run() {
    Util.getHistories(historiesObj => {
      const histories = objectValues(historiesObj);
      const handler = new PopularItemsDomHandler();

      handler.getArticles().forEach(article => {
        const hasHistory = histories.some(history => history.userId === article.userId && history.itemId === article.itemId);
        if (hasHistory) {
          handler.unShow(article, '既読記事を非表示');
          Util.infoLog('既読記事を非表示', `"${article.title}"を記事を非表示にしました`);
        }
      });

      handler.addArticleClickListner();
    });
  }

}
