import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const invisible = settings['mute-already-read-article'];
  const showButton = settings['mute-already-read-article-show-button'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>人気の投稿ページから既読記事を非表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿</a>から開いたことのある記事を非表示にします。<br>
                     再度表示したい場合は、上部の閲覧履歴タブから閲覧履歴を消してください。
                   </p>
                   <mdl-switch :checked.sync="invisible">非表示にする</mdl-switch>
                   <h4 style="margin-top:50px;">人気の投稿ページに「既読にするボタン」を表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿</a>に記事を既読にするボタンを表示します。<br>
                     「既読にするボタン」を押すことで記事を開かずに既読扱いにします。
                   </p>
                   <mdl-switch :checked.sync="showButton">表示する</mdl-switch>
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
