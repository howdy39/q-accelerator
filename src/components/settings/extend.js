import Vue from 'vue';
import AutoLikeComponent from './extend/auto-like.js';
import CopyCodeComponent from './extend/copy-code.js';
import MuteAlreadyReadArticleComponent from './extend/mute-already-read-article.js';
import MuteUserComponent from './extend/mute-user.js';
import ShowArticlesUpToTimeComponent from './extend/show-articles-up-to-time.js';
import ShowLineNumberComponent from './extend/show-line-number.js';
import ShowStockCountsComponent from './extend/show-stock-counts.js';
import FixHeaderComponent from './extend/fix-header.js';

export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-stock-counts></show-stock-counts>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-articles-up-to-time></show-articles-up-to-time>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-line-number></show-line-number>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <copy-code></copy-code>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <auto-like></auto-like>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-already-read-article></mute-already-read-article>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-user></mute-user>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <fix-header></fix-header>
               </section>`,
    components: {
      'auto-like' : AutoLikeComponent(settings),
      'copy-code' : CopyCodeComponent(settings),
      'mute-already-read-article': MuteAlreadyReadArticleComponent(),
      'mute-user' : MuteUserComponent(),
      'show-articles-up-to-time' : ShowArticlesUpToTimeComponent(settings),
      'show-line-number' : ShowLineNumberComponent(settings),
      'show-stock-counts' : ShowStockCountsComponent(settings),
      'fix-header' : FixHeaderComponent(settings),
    }
  });

  return component;
}
