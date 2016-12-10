import Vue from 'vue';
import Util from '../../../js/util';


export default function (settings) {
  const articleInvisible = settings['user-article-invisible'];
  const commentInvisible = settings['user-comment-invisible'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>特定ユーザーの投稿を非表示</h4>
                   <p>記事やコメントを非表示にします。</p>
                    <mdl-textfield floating-label="Name" textarea rows="4"></mdl-textfield>
                    <mdl-switch :checked.sync="articleInvisible" class="mdl-js-ripple-effect">記事を非表示にする</mdl-switch>
                    <mdl-switch :checked.sync="commentInvisible" class="mdl-js-ripple-effect">コメントを非表示にする</mdl-switch>
                 </div>
               </div>`,
    data: () => {
      return {
        articleInvisible,
        commentInvisible
      };
    },
    watch: {
      articleInvisible: function (val) {
        Util.saveSetting('user-article-invisible', val);
      },
      commentInvisible: function (val) {
        Util.saveSetting('user-comment-invisible', val);
      },
    }
  });
  return component;
}
