/**
 * 以下のURLで発火
 * http://qiita.com/tags/xxxxx
 */

import Util from '../common/util';
import FixHeader from './article-list-tags/fix-header.js';

Util.getSettings(settings => {

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
