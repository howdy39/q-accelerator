import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueMoment from 'vue-moment';
import Util from './util';

Vue.use(VueMdl);
Vue.use(VueMoment);

const displayVM = new Vue({
  el: '#display',
  data: {
    invisible: true
  },
  methods: {
  },
  watch: {
    invisible: function(val) {
      Util.saveSetting('popular-items-already-read-invisible', val);
    }
  }
});
displayVM;

Util.getHisotry((history) => {
  const historyVM = new Vue({
    el: '#history',
    data: {
      items: Object.values(history)
    }
  });
  historyVM;
});
