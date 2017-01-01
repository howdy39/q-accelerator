import Vue from 'vue';
import Util from '../../../common/util';


export default function (settings) {
  let newUser = '';
  let users = settings['mute-users'];
  const articleInvisible = settings['mute-user-article'];
  const commentInvisible = settings['mute-user-comment'];
  const component = Vue.extend({
    template: `<div class="mdl-card mdl-cell mdl-cell--12-col">
                 <div class="mdl-card__supporting-text">
                   <h4>特定ユーザーの投稿を非表示</h4>
                   <p>記事やコメントを非表示にします。<br>
                     ユーザーIDはURLのxxxの部分です。例）http://qiita.com/xxx/items/〜
                   </p>
                   <mdl-switch :checked.sync="articleInvisible" class="mdl-js-ripple-effect">記事を非表示にする</mdl-switch>
                   <mdl-switch :checked.sync="commentInvisible" class="mdl-js-ripple-effect">コメントを非表示にする</mdl-switch>
                   <mdl-textfield floating-label="ユーザーIDを入力してEnter" :value.sync="newUser" @keyup.enter="addUser"></mdl-textfield>
                   <ul>
                     <li v-for="user in users">
                       <span>{{user}}</span>
                       <mdl-button icon class="icon" @click="removeUser($index)">
                        <i class="material-icons">delete</i>
                       </mdl-button>
                     </li>
                   </ul>
                 </div>
               </div>`,
    data: () => {
      return {
        newUser,
        users,
        articleInvisible,
        commentInvisible
      };
    },
    watch: {
      articleInvisible: function (val) {
        Util.saveSetting('mute-user-article', val);
      },
      commentInvisible: function (val) {
        Util.saveSetting('mute-user-comment', val);
      },
    },
    methods: {
      addUser: function () {
        const user = this.newUser.trim();
        if (user && this.users.includes(user) === false) {
          this.users.push(user);
          Util.saveSetting('mute-users', this.users);
          this.newUser = '';
        }
      },
      removeUser: function (index) {
        this.users.splice(index, 1);
        Util.saveSetting('mute-users', this.users);
      }
    }
  });
  return component;
}
