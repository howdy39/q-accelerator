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

chrome.storage.local.get('index', function(items) {
  console.log(items.index);

  // for (let [key, value] of Object.entries(items.index)) {
  //   console.log(key, value);
  // }

  const historyVM = new Vue({
    el: '#history',
    data: {
      items: Object.values(items.index)
    }
  });
  historyVM;
});

