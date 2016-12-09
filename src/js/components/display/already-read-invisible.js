import Vue from 'vue';
import Util from '../../util';


export default function (settings) {
  const invisible = settings['already-read-invisible'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>人気の投稿</h4>
                   <p><a href="http://qiita.com/popular-items" target="_blank">人気の投稿ページ</a>の表示をカスタマイズします。</p>
                   <div>
                     <h5>既に読んだ記事</h5>
                     <mdl-switch :checked.sync="invisible" class="mdl-js-ripple-effect">非表示にする</mdl-switch>
                   </div>
                 </div>
               </div>`,
    data: () => {
      return {invisible};
    },
    watch: {
      invisible: function (val) {
        Util.saveSetting('already-read-invisible', val);
      }
    }
  });
  return component;
}
