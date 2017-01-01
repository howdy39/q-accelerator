import Util from '../../js/util';
import ArticleDomHandler from './article-dom-handler.js';


export default class MuteUserCommentContent {

  run(muteUserIds) {
    const handler = new ArticleDomHandler();

    handler.getArticle().comments.forEach(comment => {
      const hasUserId = muteUserIds.includes(comment.userId);
      if (hasUserId) {
        handler.unShowComment(comment);
        Util.infoLog(`特定ユーザーの投稿を非表示(${comment.userId})`, `${comment.userId}のコメントを非表示にしました`);
      }
    });

    handler.getArticle().references.forEach(reference => {
      const hasUserId = muteUserIds.includes(reference.userId);
      if (hasUserId) {
        handler.unShowReference(reference);
        Util.infoLog(`特定ユーザーの投稿を非表示(${reference.userId})`, `${reference.title}の参照記事を非表示にしました`);
      }
    });
  }

}
