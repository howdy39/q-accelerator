/*eslint no-irregular-whitespace:"off"*/


import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const showLangName = settings['show-lang-name'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>言語名を表示</h4>
                   <p>コードブロックの言語名を表示します。</p>
                   <mdl-switch :checked.sync="showLangName">固定する</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        showLangName,
      };
    },
    watch: {
      showLangName: function (bool) {
        Util.saveSetting('show-lang-name', bool);
      },
    }
  });
  return component;
}
