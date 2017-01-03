/**
 * 以下のURLで発火
 * http://qiita.com
 * http://qiita.com/items
 * http://qiita.com/stock
 * http://qiita.com/mine
 */

import Util from '../common/util';
import MuteUserArticleListStreamContent from './article-list-stream/mute-user-article-list-stream-content.js';


Util.getSettings(settings => {

  try {
    if (settings['mute-users'] && settings['mute-user-article']) {
      new MuteUserArticleListStreamContent().run(settings['mute-users']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

});

