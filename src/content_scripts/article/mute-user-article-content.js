import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';


export default class MuteUserArticleContent {

  run(muteUserIds) {
    const handler = new ArticleDomHandler();

    handler.getReferences().forEach(reference => {
      const hasUserId = muteUserIds.includes(reference.userId);
      if (hasUserId) {
        handler.unShowReference(reference);
        Util.infoLog(`特定ユーザーの投稿を非表示(${reference.userId})`, `${reference.title}の参照記事を非表示にしました`);
      }
    });
  }

}
