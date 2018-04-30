/**
 * 以下のURLで発火
 * http://qiita.com/*
 */

import Util from '../common/util';
import FixHeader from './all/fix-header.js';

Util.getSettings(settings => {

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
