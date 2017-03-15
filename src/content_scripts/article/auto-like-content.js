import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class AutoLikeContent {

  run(onStockOnLike, offStockOffLike, onLikeOnStock, offLikeOffStock) {
    const mo = new MutationObserver(function () {
      const handler = new ArticleDomHandler();

      if (!handler.isLikeButtonAvailable()) {
        return false;
      }

      if (onStockOnLike || offStockOffLike) {
        handler.addStockButtonClickListener(e => {
          if (e.isTrusted) {
            if (onStockOnLike && !handler.isLiked() && !handler.isStocked()) {
              handler.addLike();
              Util.infoLog('自動いいね（ON）');
            } else if (offStockOffLike && handler.isLiked() && handler.isStocked()) {
              handler.addLike();
              Util.infoLog('自動いいね（OFF）');
            }
          }
        });
      }
      if (onLikeOnStock || offLikeOffStock) {
        handler.addLikeButtonClickListener(e => {
          if (e.isTrusted) {
            if (onLikeOnStock && !handler.isLiked() && !handler.isStocked()) {
              handler.addStock();
              Util.infoLog('自動ストック（ON）');
            } else if (offLikeOffStock && handler.isLiked() && handler.isStocked()) {
              handler.addStock();
              Util.infoLog('自動ストック（OFF）');
            }
          }
        });
      }
    });

    const target = ArticleDomHandler.getLikeObserverElement();
    const options = {childList: true, subtree: true};
    mo.observe(target, options);
  }
}
