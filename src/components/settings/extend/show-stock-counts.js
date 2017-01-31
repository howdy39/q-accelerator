import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const show = settings['show-stock-counts'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4><i class="fa fa-flask" aria-hidden="true"></i>ストック数を表示</h4>
                   <p>
                     ストック数を表示します。
                   </p>
                   <mdl-switch :checked.sync="show">表示する</mdl-switch>
                   <p>
                     ※この機能は実験的に作成しています。<br>
                     ユーザー認証を入れていないので、同一IPで150リクエスト/1時間の制限があります。<br>
                     制限を超えた場合はストック数が表示されません。<br>
                     制限を解除して欲しいという方は<a href="https://github.com/howdy39/q-accelerator/issues/153" target="_blank">issue</a>で+1してください。
                   </p>
                 </div>
               </div>`,
    data: () => {
      return {show};
    },
    watch: {
      show: function (bool) {
        Util.saveSetting('show-stock-counts', bool);
      }
    }
  });
  return component;
}
