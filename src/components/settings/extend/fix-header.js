/*eslint no-irregular-whitespace:"off"*/


import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const fixHeader = settings['fix-header'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>ヘッダーを固定</h4>
                   <p>
                    ヘッダーを固定し、スクロールしても常に表示されるようにします。(主要なページのみ対応)
                   </p>
                   <mdl-switch :checked.sync="fixHeader">固定する</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        fixHeader,
      };
    },
    watch: {
      fixHeader: function (bool) {
        Util.saveSetting('fix-header', bool);
      },
    }
  });
  return component;
}
