import Vue from 'vue';
import VueMdl from 'vue-mdl';
import Util from './util';

Vue.use(VueMdl);
console.log('hogehoge');

const displayVM = new Vue({
  el: '#display',
  data: {
    message: 'めっせーじ3',
    alreadyReaded: 'smoke'
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
