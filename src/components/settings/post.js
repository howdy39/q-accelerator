import Vue from 'vue';
import DefaultBodyComponent from './post/default-body.js';

export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <default-body></default-body>
               </section>`,
    components: {
      'default-body': DefaultBodyComponent(settings),
    }
  });

  return component;
}
