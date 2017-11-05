import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

import axios from 'axios';

export default class ShowStockCountsContent {

  run() {
    const mo = new MutationObserver(function () {
      const handler = new ArticleDomHandler();

      const url = handler.getUrl();
      const {itemKind, itemId} = Util.parseUrl(url);

      // プライベート記事はストック不可なので不要
      if (itemKind === 'private') return;

      axios.get(`https://qiita.com/api/v2/items/${itemId}/stockers?per_page=100`)
      .then(response => {
        handler.prependCountToStock(response.data.length >= 100 ? '100+' : response.data.length);
      })
      .catch(error => {
        Util.infoLog('ストック数を表示', error.response.data.error);
        Util.errorLog(error);
      });

      mo.disconnect();
    });

    const target = ArticleDomHandler.getStockObserverElement();
    const options = {childList: true, subtree: true};
    mo.observe(target, options);
  }

}
