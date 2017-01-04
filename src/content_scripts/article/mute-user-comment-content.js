import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';


export default class MuteUserCommentContent {

  run(muteUserIds) {
    const handler = new ArticleDomHandler();

    handler.getComments().forEach(comment => {
      const hasUserId = muteUserIds.includes(comment.userId);
      if (hasUserId) {
        handler.unShowComment(comment);
        Util.infoLog(`特定ユーザーの投稿を非表示(${comment.userId})`, `${comment.userId}のコメントを非表示にしました`);
      }
    });
  }

}
