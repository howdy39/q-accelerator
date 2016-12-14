import Vue from 'vue';


export default function () {
  const component = Vue.extend({
    template: `
          <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
            <div class="mdl-card mdl-cell mdl-cell--12-col">
              <div class="mdl-card__supporting-text">
                <h4>Thanks</h4>
                <p>
                  以下の記事で書かれていた内容を参考にさせてもらいましたm(_ _)m
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
        }
      ]
      return {
        items
      };
    }
  });
  return component;
}
