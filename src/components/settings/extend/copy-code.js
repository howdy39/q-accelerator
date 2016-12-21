import Vue from 'vue';
import Util from '../../../js/util';

export default function (settings) {
  const show = settings['copy-code'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>コードのコピー機能を追加</h4>
                   <p>
                     コードの上部にコピーアイコンを表示します。<br>
                     ※コピーは差分を考慮するため、削除行をコピーしません。また行頭の+(プラス)を除外します。
                   </p>
                   <mdl-switch :checked.sync="show" class="mdl-js-ripple-effect">表示する</mdl-switch>
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
