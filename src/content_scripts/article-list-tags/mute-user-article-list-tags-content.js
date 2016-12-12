import ArticleListTagsDomHandler from './article-list-tags-dom-handler.js'


export default class MuteUserArticleListTagsContent {

  run(muteUserIds) {
    const handler = new ArticleListTagsDomHandler();

    handler.getArticles().forEach(article => {
      const hasUserId = muteUserIds.includes(article.userId);
      if (hasUserId) handler.unShow(article, `特定ユーザーの投稿を非表示(${article.userId})`);
    });
  }

}
