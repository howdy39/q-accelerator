import Util from '../../js/util';
import PopularItemsDomHandler from './popular-items-dom-handler.js';


export default class MuteUserArticleContent {

  run(muteUserIds) {
    const handler = new PopularItemsDomHandler();

    handler.getArticles().forEach(article => {
      const hasUserId = muteUserIds.some(muteUserId => muteUserId === article.userId);
      if (hasUserId) {
        handler.unShow(article);
        Util.infoLog(`特定ユーザーの投稿を非表示(${article.userId})`, `"${article.title}"を記事を非表示にしました`);
      }
    });

  }

}
