import Vue from 'vue';
import Util from '../../../js/util';


export default function (settings) {
  const invisible = settings['mute-already-read-article'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>既読記事を非表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿ページ</a>から開いたことのある記事を非表示にします。
                    </p>
                   <mdl-switch :checked.sync="invisible" class="mdl-js-ripple-effect">非表示にする</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {invisible};
    },
    watch: {
      invisible: function (val) {
        Util.saveSetting('mute-already-read-article', val);
      }
    }
  });
  return component;
}
