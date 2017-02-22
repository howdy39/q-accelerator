import axios from 'axios';
import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const defaultBody = settings['default-body'];
  const defaultBodyTemplate = settings['default-body-template'];
  const defaultBodyUrl = settings['default-body-url'];
  const defaultBodyUrlTemplate = settings['default-body-url-template'];

  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>新規投稿時のテンプレート</h4>
                   <p>
                     記事を新しく作った際に、テンプレートの内容で入力済みにします。<br>
                   </p>
                   <p>
                     <mdl-switch :checked.sync="defaultBody">テンプレートを利用する（直接入力）</mdl-switch>
                     <mdl-switch :checked.sync="defaultBodyUrl">テンプレートを利用する（ファイルのURLを指定）<a href="https://github.com/howdy39/q-accelerator/blob/master/docs/users/how-to-create-article-template-url.md" target="_blank">※指定するURLについて</a></mdl-switch>
                   </p>

                   <div v-if="defaultBody">
                     <textarea v-model="defaultBodyTemplate" rows="20" placeholder="テンプレートを入力" style="width:100%"></textarea>
                   </div>
                   <div v-if="defaultBodyUrl">
                     <mdl-textfield floating-label="テンプレートファイルのURL" :value.sync="defaultBodyUrlTemplate" pattern="https?://.+" style="width:100%""></mdl-textfield>
                     {{isBlankDefaultBodyUrlTemplate}}
                   </div>

                  <div v-if="defaultBody || defaultBodyUrl">
                   <mdl-button raised colored accent v-mdl-ripple-effect @click="saveTemplate">テンプレートを保存する</mdl-button>
                  </div>
                  <mdl-snackbar display-on="snackbar"></mdl-snackbar>
               </div>`,
    data: () => {
      return {
        defaultBody,
        defaultBodyTemplate,
        defaultBodyUrl,
        defaultBodyUrlTemplate
      };
    },
    watch: {
      defaultBody: function (bool) {
        Util.saveSetting('default-body', bool, () => {
          if (bool && this.defaultBodyUrl === true) {
            this.defaultBodyUrl = false;
          }
        });
      },
      defaultBodyUrl: function (bool) {
        Util.saveSetting('default-body-url', bool, () => {
          if (bool && this.defaultBody === true) {
            this.defaultBody = false;
          }
        });
      },
    },
    methods: {
      saveTemplate: function () {
        if (this.defaultBody) {
          Util.saveSetting('default-body-template', this.defaultBodyTemplate);
          this.$broadcast('snackbar', { message: 'テンプレートを保存しました' });
        } else if (this.defaultBodyUrl) {
          if (this.defaultBodyUrlTemplate === '') {
            this.$broadcast('snackbar', { message: 'URLが未入力です'});
            return;
          }

          axios.get(this.defaultBodyUrlTemplate + '?nocache=' + (new Date()).getTime())
          .then(() => {
            Util.saveSetting('default-body-url-template', this.defaultBodyUrlTemplate);
            this.$broadcast('snackbar', { message: 'テンプレートを保存しました' });
          })
          .catch(error => {
            Util.errorLog(error);
            this.$broadcast('snackbar', { message: `URLが間違っていないか確認してください ${error}`});
          });
        }
      },
    }
  });
  return component;
}
