import Util from '../../common/util';
import ArticleListTagsDomHandler from './article-list-tags-dom-handler.js';


export default class MuteUserArticleListTagsContent {

  run(muteUserIds) {
    const handler = new ArticleListTagsDomHandler();

    handler.getArticles().forEach(article => {
      const hasUserId = muteUserIds.includes(article.userId);
      if (hasUserId) {
        handler.unShow(article);
        Util.infoLog(`特定ユーザーの投稿を非表示(${article.userId})`, `"${article.title}"を記事を非表示にしました`);
      }
    });
  }

}
