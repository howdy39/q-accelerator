import PopularItemsDomHandler from './popular-items-dom-handler.js';


export default class MuteUserArticleContent {

  run(muteUserIds) {
    const handler = new PopularItemsDomHandler();

    handler.getArticleObjects().forEach(article => {
      const hasMuteUser = muteUserIds.some(muteUserId => muteUserId === article.userId);
      if (hasMuteUser) handler.unShow(article, '特定ユーザーの投稿を非表示');
    });

  }

}
