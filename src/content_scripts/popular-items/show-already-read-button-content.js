import Util from '../../common/util';
import PopularItemsDomHandler from './popular-items-dom-handler.js';

export default class ShowAlreadyReadButtonContent {

  run() {
    const handler = new PopularItemsDomHandler();

    handler.addAlreadyReadButton((href, title) => {
      const url = window.location.origin + href;
      const date = (new Date()).getTime();
      Util.saveHistory(url, title, date);
    });
  }

}
