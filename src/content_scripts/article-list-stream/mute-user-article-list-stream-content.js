import ArticleListStreamDomHandler from './article-list-stream-dom-handler.js'


export default class MuteUserArticleListStreamContent {

  run(muteUserIds) {
    const items = ArticleListStreamDomHandler.getObserverItems();
    const options = ArticleListStreamDomHandler.getObserverOptions();

    const mo = new MutationObserver(function () {
      const handler = new ArticleListStreamDomHandler();

      handler.getArticleObjects().forEach(article => {
        const hasUserId = muteUserIds.includes(article.userId);
        if (hasUserId) handler.unShow(article, `特定ユーザーの投稿を非表示(${article.userId})`);
      });
    });

    mo.observe(items, options);
  }

}
