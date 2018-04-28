import Vue from 'vue';

export default function () {
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>人気の投稿ページから既読記事を非表示</h4>
                   <p>
                     <a href="http://qiita.com/popular-items" target="_blank">人気の投稿</a>から開いたことのある記事を非表示にします。<br>
                     再度表示したい場合は、上部の閲覧履歴タブから閲覧履歴を消してください。
                   </p>
                   <p>
                    <strong>この機能は不要と判断し、廃止しました。</strong>
                   </p>
                </div>
               </div>`,
  });
  return component;
}
