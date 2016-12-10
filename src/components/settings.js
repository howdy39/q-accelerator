import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueMoment from 'vue-moment';
import Util from '../js/util';
import DisplayComponent from './settings/display.js';
import HistoriesComponent from './settings/histories.js';


Vue.use(VueMdl);
Vue.use(VueMoment);

Util.getSettings((settings) => {
  new Vue({
    el: '#display',
    components: {
      'display' : DisplayComponent(settings)
    }
  });
});

Util.getHistories((histories) => {
  new Vue({
    el: '#histories',
    components: {
      'histories' : HistoriesComponent(histories)
    }
  });
});
