import Vue from 'vue';
import Util from '../../../common/util';

export default function (settings) {
  const defaultBody = settings['default-body'];
  const defaultBodyTemplate = settings['default-body-template'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>新規投稿時のテンプレート</h4>
                   <p>
                     記事を新しく作った際に、テンプレートの内容で入力済みになります。
                   </p>
                   <p>
                     <mdl-switch :checked.sync="defaultBody" class="mdl-js-ripple-effect">テンプレートを利用する</mdl-switch>
                   </p>
                   <textarea v-model="defaultBodyTemplate" rows="20" placeholder="テンプレートを入力" style="min-width: 600px"></textarea>
                   <mdl-button raised colored accent v-mdl-ripple-effect @click="saveTemplate">テンプレートを保存する</mdl-button>
                   <mdl-snackbar display-on="snackbar"></mdl-snackbar>
                 </div>
               </div>`,
    data: () => {
      return {
        defaultBody,
        defaultBodyTemplate
      };
    },
    watch: {
      defaultBody: function (bool) {
        Util.saveSetting('default-body', bool);
      },
    },
    methods: {
      saveTemplate: function () {
        Util.saveSetting('default-body-template', this.defaultBodyTemplate);
        this.$broadcast('snackbar', { message: 'テンプレートを保存しました' });
      },
    }
  });
  return component;
}
