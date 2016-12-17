import Vue from 'vue';


export default function () {
  const component = Vue.extend({
    template: `
          <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
            <div class="mdl-card mdl-cell mdl-cell--12-col">
              <div class="mdl-card__supporting-text">
                <h4>Thanks</h4>
                <p>
                  本拡張機能は以下の記事で書かれていたコードやアイデアを参考にさせてもらいました。感謝します。
                </p>
                <ul>
                  <template v-for="item in items">
                    <li>
                      <a href="{{ item.articleUrl }}" target="_blank">{{ item.articleTitle }}</a>
                      <a href="{{ item.userUrl }}">@{{ item.userId }}</a>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </section>`,
    data: () => {
      const items = [
        {
          articleTitle: 'Qiitaのフィードから特定ユーザーの投稿を非表示にするユーザースクリプト',
          articleUrl: 'http://qiita.com/khsk/items/392ec147c4962caed9ca',
          userId: 'khsk',
          userUrl: 'http://qiita.com/khsk'
        },
        {
          articleTitle: 'Qiitaの「いいね」について思った事',
          articleUrl: 'http://qiita.com/kinpira/items/189d4ee1bafd5876e007',
          userId: 'kinpira',
          userUrl: 'http://qiita.com/kinpira'
        },
        {
          articleTitle: 'Qiitaのコードの左側に選択不可能な行番号を追加するユーザースクリプト',
          articleUrl: 'http://qiita.com/khsk/items/89fc40321f1387829135#_reference-491bbbf2aa388d83a35a',
          userId: 'khsk',
          userUrl: 'http://qiita.com/khsk'
        }
      ];
      return {
        items
      };
    }
  });
  return component;
}
