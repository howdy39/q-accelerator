import Vue from 'vue';
import PopularItemsComponent from './display/popular-items.js';


export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <popular-items></popular-items>
               </section>`,
    components: {
      'popular-items': PopularItemsComponent(settings)
    }
  });

  return component;
}
