import Util from '../js/util';
import SaveHisotoryContent from './article/save-history.js';
import AutoLikeContent from './article/auto-like-content.js';
import MuteUserCommentContent from './article/mute-user-comment-content.js';
import ShowLineNumberContent from './article/show-line-number-content.js';



new SaveHisotoryContent().run();

Util.getSettings(settings => {

  try {
    if (settings['mute-users'] && settings['mute-user-comment']) {
      new MuteUserCommentContent().run(settings['mute-users']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    new AutoLikeContent().run(settings['auto-like'], settings['auto-stock']);
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['show-line-number']) {
      new ShowLineNumberContent().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
