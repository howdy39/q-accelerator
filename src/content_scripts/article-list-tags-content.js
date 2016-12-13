/**
 * 以下のURLで発火
 * http://qiita.com/tags
 */

import Util from '../js/util';
import MuteUserArticleListTagsContent from './article-list-tags/mute-user-article-list-tags-content.js';


Util.getSettings(settings => {
  if (settings['mute-users'] && settings['mute-user-article']) {
    new MuteUserArticleListTagsContent().run(settings['mute-users']);
  }
});

