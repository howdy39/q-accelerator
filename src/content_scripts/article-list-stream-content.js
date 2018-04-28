/**
 * 以下のURLで発火
 * http://qiita.com
 * http://qiita.com/items
 * http://qiita.com/stock
 * http://qiita.com/mine
 */

import Util from '../common/util';
import FixHeader from './article-list-stream/fix-header.js';

Util.getSettings(settings => {

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
