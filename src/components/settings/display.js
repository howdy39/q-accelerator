import Vue from 'vue';
import MuteUserComponent from './display/mute-user.js';
import MuteAlreadyReadArticleComponent from './display/mute-already-read-article.js';


export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-user></mute-user>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-already-read-article></mute-already-read-article>
               </section>`,
    components: {
      'mute-user' : MuteUserComponent(settings),
      'mute-already-read-article': MuteAlreadyReadArticleComponent(settings)
    }
  });

  return component;
}
