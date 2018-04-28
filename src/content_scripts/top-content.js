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
    if (settings['fix-header']) { //FIXME: 実際の設定値を使用するように書き換えてください。
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
