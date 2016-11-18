import Vue from 'vue';
import VueMdl from 'vue-mdl';

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