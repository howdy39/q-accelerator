/**
 * 以下のURLで発火
 * http://qiita.com/tags/xxxxx
 */

import Util from '../common/util';
import FixHeader from './article-list-tags/fix-header.js';
import MuteUserArticleListTagsContent from './article-list-tags/mute-user-article-list-tags-content.js';

Util.getSettings(settings => {

  try {
    if (settings['mute-users'] && settings['mute-user-article']) {
      new MuteUserArticleListTagsContent().run(settings['mute-users']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
