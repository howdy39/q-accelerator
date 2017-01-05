import Vue from 'vue';
import Util from '../../../common/util';


export default function (settings) {
  const invisible = settings['mute-already-read-article'];
  const showButton = settings['mute-already-read-article-show-button'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>人気の投稿から既読記事を非表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿</a>から開いたことのある記事を非表示にします。
                   </p>
                   <mdl-switch :checked.sync="invisible" class="mdl-js-ripple-effect">非表示にする</mdl-switch>
                   <h4 style="margin-top:50px;">人気の投稿に既読ボタンを表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿</a>の記事の横に既読ボタンを表示します。<br>
                     既読ボタンを押すことで記事を開かずに一覧を整理していくことが可能です。
                   </p>
                   <mdl-switch :checked.sync="showButton" class="mdl-js-ripple-effect">表示する</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        invisible,
        showButton,
      };
    },
    watch: {
      invisible: function (val) {
        Util.saveSetting('mute-already-read-article', val);
      },
      showButton: function (val) {
        Util.saveSetting('mute-already-read-article-show-button', val);
      }
    }
  });
  return component;
}
