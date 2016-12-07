import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueMoment from 'vue-moment';
import Util from './util';
import DisplayComponent from './components/display.js';
import HistoriesComponent from './components/histories.js';


Vue.use(VueMdl);
Vue.use(VueMoment);

Util.getSettings((settings) => {

  // #display
  Vue.component('display',
    DisplayComponent(settings));

  new Vue({
    el: '#display'
  });
});

Util.getHistories((histories) => {

  // #histories
  Vue.component('histories',
    HistoriesComponent(histories));

  new Vue({
    el: '#histories'
  });
});
