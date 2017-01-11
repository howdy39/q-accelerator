import Vue from 'vue';
import Util from '../../../common/util';


export default function (settings) {
  const show = settings['show-line-number'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>行番号を表示</h4>
                   <p>
                     コードの左に行番号を表示します。
                   </p>
                   <mdl-switch :checked.sync="show">表示する</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {show};
    },
    watch: {
      show: function (bool) {
        Util.saveSetting('show-line-number', bool);
      }
    }
  });
  return component;
}
