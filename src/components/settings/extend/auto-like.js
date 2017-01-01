import Vue from 'vue';
import Util from '../../../common/util';


export default function (settings) {
  const autoLike = settings['auto-like'];
  const autoStock = settings['auto-stock'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>自動いいね/自動ストック</h4>
                   <p>
                     自動いいね: 「ストック」したときに「いいね」を自動でおこないます。<br>
                     自動ストック: 「いいね」したときに「ストック」を自動でおこないます。<br>
                     ※「ストック」や「いいね」をはずしたときに自動ではすすことはしません。
                   </p>
                   <mdl-switch :checked.sync="autoLike" class="mdl-js-ripple-effect">自動いいね</mdl-switch>
                   <mdl-switch :checked.sync="autoStock" class="mdl-js-ripple-effect">自動ストック</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        autoLike,
        autoStock
      };
    },
    watch: {
      autoLike: function (bool) {
        Util.saveSetting('auto-like', bool);
      },
      autoStock: function (bool) {
        Util.saveSetting('auto-stock', bool);
      }
    }
  });
  return component;
}
