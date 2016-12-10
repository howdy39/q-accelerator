import Vue from 'vue';
import MuteComponent from './display/mute.js';
import AlreadyReadInvisibleComponent from './display/already-read-invisible.js';


export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute></mute>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <already-read-invisible></already-read-invisible>
               </section>`,
    components: {
      'mute' : MuteComponent(settings),
      'already-read-invisible': AlreadyReadInvisibleComponent(settings)
    }
  });

  return component;
}
