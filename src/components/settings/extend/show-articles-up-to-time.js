import Vue from 'vue';
import Util from '../../../common/util';


export default function (settings) {
  const show = settings['show-article-update-time'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>記事の更新時間を表示</h4>
                   <p>
                     詳細な更新時間がわかるようになります。<br>
                     2017年02月22日に投稿 → 2017年02月22日 20時46分に投稿
                   </p>
                   <mdl-switch :checked.sync="show">表示する</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {show};
    },
    watch: {
      show: function (bool) {
        Util.saveSetting('show-article-update-time', bool);
      }
    }
  });
  return component;
}
