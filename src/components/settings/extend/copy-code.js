import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const show = settings['copy-code'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>コピーアイコンを表示</h4>
                   <p>
                     コードの上にコピーアイコンを表示します。<br>
                     コピーアイコンをクリックするとクリップボードにコードをコピーします。<br>
                     <mdl-switch :checked.sync="show" class="mdl-js-ripple-effect">表示する</mdl-switch>
                     <br>
                     <br>
                     ※コピーは<a href="http://qiita.com/kakakakakku/items/461e000587b707785e79" target="_blank">diff形式のコード</a>の場合、以下のような差分を解釈してコピーします。
                     <ul>
                       <li>行頭に「-」がある削除行を除いてコピーします。
                       <li>行頭の「+」を除いてコピーします。
                     </ul>
                   </p>
                 </div>
               </div>`,
    data: () => {
      return {show};
    },
    watch: {
      show: function (bool) {
        Util.saveSetting('copy-code', bool);
      }
    }
  });
  return component;
}
