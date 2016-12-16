import Util from '../js/util';
import ArticleContent from './article/article-content.js';
import AutoLikeContent from './article/auto-like-content.js';
import MuteUserCommentContent from './article/mute-user-comment-content.js';


new ArticleContent().run();

Util.getSettings(settings => {
  if (settings['mute-users'] && settings['mute-user-comment']) {
    new MuteUserCommentContent().run(settings['mute-users']);
  }

  new AutoLikeContent().run(settings['auto-like'], settings['auto-stock']);
});
