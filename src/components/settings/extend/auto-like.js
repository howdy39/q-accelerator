/*eslint no-irregular-whitespace:"off"*/


import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const onStockOnLike = settings['on-stock-on-like'];
  const offStockOffLike = settings['off-stock-off-like'];
  const onLikeOnStock = settings['on-like-on-stock'];
  const offLikeOffLike = settings['off-like-off-stock'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>自動いいね/自動ストック</h4>
                   <p>
                    「いいね」や「ストック」を押した際の挙動をカスタマイズします。
                   </p>
                   <mdl-switch :checked.sync="onLikeOnStock">
                     「いいね」したとき、自動で「ストック」する　　　 <qiita-no-like></qiita-no-like>→<qiita-like></qiita-like> <qiita-no-stock/></qiita-no-stock>→<qiita-stock></qiita-stock>
                   </mdl-switch>
                   <mdl-switch :checked.sync="onStockOnLike">
                     「ストック」したとき、自動で「いいね」する　　　 <qiita-no-stock/></qiita-no-stock>→<qiita-stock></qiita-stock> <qiita-no-like></qiita-no-like>→<qiita-like></qiita-like>
                   </mdl-switch>
                   <mdl-switch :checked.sync="offLikeOffLike">
                     「いいね」を外したとき、自動で「ストック」を外す <qiita-like></qiita-like>→<qiita-no-like></qiita-no-like> <qiita-stock/></qiita-stock>→<qiita-no-stock></qiita-no-stock>
                   </mdl-switch>
                   <mdl-switch :checked.sync="offStockOffLike">
                     「ストック」を外したとき、自動で「いいね」を外す <qiita-stock/></qiita-stock>→<qiita-no-stock></qiita-no-stock> <qiita-like></qiita-like>→<qiita-no-like></qiita-no-like> 
                   </mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        onStockOnLike,
        offStockOffLike,
        onLikeOnStock,
        offLikeOffLike,
      };
    },
    watch: {
      onStockOnLike: function (bool) {
        Util.saveSetting('on-stock-on-like', bool);
      },
      offStockOffLike: function (bool) {
        Util.saveSetting('off-stock-off-like', bool);
      },
      onLikeOnStock: function (bool) {
        Util.saveSetting('on-like-on-stock', bool);
      },
      offLikeOffLike: function (bool) {
        Util.saveSetting('off-like-off-stock', bool);
      },
    }
  });
  return component;
}
