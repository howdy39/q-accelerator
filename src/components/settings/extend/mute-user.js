import Vue from 'vue';


export default function () {
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>特定ユーザーの投稿を非表示</h4>
                   <p>記事やコメントを非表示にします。<br>
                     ユーザーIDはURLのxxxの部分です。例）http://qiita.com/xxx/items/〜
                   </p>
                   <p>
                    <strong>この機能は公式がミュート機能を用意したため廃止しました。</strong><br>
                    <a href="http://blog.qiita.com/post/173120067699/trend-mute">トレンドロジック変更・ミュート機能についてお知らせ - Qiita Blog</a>
                  </p>
                 </div>
               </div>`,
  });
  return component;
}
