/**
 * 以下のURLで発火
 * http://qiita.com/trend
 * http://qiita.com/timeline
 * http://qiita.com/tag-feed
 */

import Util from '../common/util';
import FixHeader from './top/fix-header.js';

Util.getSettings(settings => {

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
