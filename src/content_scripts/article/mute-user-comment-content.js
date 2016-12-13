import ArticleDomHandler from './article-dom-handler.js'


export default class MuteUserCommentContent {

  run(muteUserIds) {
    const handler = new ArticleDomHandler();

    handler.getArticle().comments.forEach(comment => {
      const hasUserId = muteUserIds.includes(comment.userId);
      if (hasUserId) handler.unShowComment(comment, `特定ユーザーの投稿を非表示(${comment.userId})`);
    });
  }

}
