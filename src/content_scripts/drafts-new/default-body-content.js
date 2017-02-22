import axios from 'axios';
import Util from '../../common/util';
import DraftsNewDomHandler from './drafts-new-dom-handler.js';

export default class DefaultBodyContent {

  runByDefaultBody(defaultBodyTemplate) {
    this.setDraftBody(handler => {
      handler.setDraftBody(defaultBodyTemplate);
    });
  }

  runByDefaultBodyUrl(defaultBodyUrlTemplate) {
    this.setDraftBody(handler => {
      axios.get(defaultBodyUrlTemplate + '?nocache=' + (new Date()).getTime())
      .then(response => {
        handler.setDraftBody(response.data);
      })
      .catch(error => {
        Util.errorLog(error);
      });
    });
  }

  setDraftBody(callback) {
    const handler = new DraftsNewDomHandler();
    if (handler.getDraftBody() === '') { // 間違って上書きしないように念のために設定
      callback(handler);
    }
  }
}
