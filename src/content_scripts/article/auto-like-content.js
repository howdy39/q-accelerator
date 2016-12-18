import Util from '../../js/util';
import ArticleDomHandler from './article-dom-handler.js';


export default class AutoLikeContent {

  run(autoLike, autoStock) {
    const handler = new ArticleDomHandler();

    if (!handler.isLikeButtonAvailable()) {
      return false;
    }

    if (autoLike) {
      handler.addStockButtonClickListener(() => {
        if (!handler.isLiked() && !handler.isStocked()) {
          handler.addLike();
          Util.infoLog('自動いいね');
        }
      });
    }
    if (autoStock) {
      handler.addLikeButtonClickListener(() => {
        if (!handler.isLiked() && !handler.isStocked()) {
          handler.addStock();
          Util.infoLog('自動ストック');
        }
      });
    }
  }

}
