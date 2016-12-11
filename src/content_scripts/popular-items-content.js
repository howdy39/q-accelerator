import Util from '../js/util';
import MuteAlreadyReadArticleContent from './popular-items/mute-already-read-article-content.js';
import MuteUserArticleContent from './popular-items/mute-user-article-content.js';

Util.getSettings(settings => {
  if (settings['mute-already-read-article']) {
    new MuteAlreadyReadArticleContent().run();
  }

  if (settings['mute-users'] && settings['mute-user-article']) {
    new MuteUserArticleContent().run(settings['mute-users']);
  }
});
