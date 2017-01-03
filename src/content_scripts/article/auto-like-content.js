import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';


export default class AutoLikeContent {

  run(autoLike, autoStock) {
    const handler = new ArticleDomHandler();

    if (!handler.isLikeButtonAvailable()) {
      return false;
    }

    if (autoLike) {
      handler.addStockButtonClickListener(e => {
        if (e.isTrusted && !handler.isLiked() && !handler.isStocked()) {
          handler.addLike();
          Util.infoLog('自動いいね');
        }
      });
    }
    if (autoStock) {
      handler.addLikeButtonClickListener(e => {
        if (e.isTrusted && !handler.isLiked() && !handler.isStocked()) {
          handler.addStock();
          Util.infoLog('自動ストック');
        }
      });
    }
  }

}
