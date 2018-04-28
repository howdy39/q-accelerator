import Util from '../common/util';
import AutoLikeContent from './article/auto-like-content.js';
import CopyCodeContent from './article/copy-code-content.js';
import FixHeader from './article/fix-header.js';
import MuteUserArticleContent from './article/mute-user-article-content.js';
import MuteUserCommentContent from './article/mute-user-comment-content.js';
import SaveHisotoryContent from './article/save-history.js';
import ShowArticlesUpToTimeContent from './article/show-articles-up-to-time-content.js';
import ShowLineNumberContent from './article/show-line-number-content.js';
import ShowStockCountsContent from './article/show-stock-counts-content.js';

Util.getSettings(settings => {
  try {
    if (settings['save-history']) {
      new SaveHisotoryContent().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['on-stock-on-like'] || settings['off-stock-off-like']
     || settings['on-like-on-stock']  || settings['off-like-off-stock']) {
      new AutoLikeContent().run(settings['on-stock-on-like'], settings['off-stock-off-like'],
                                settings['on-like-on-stock'], settings['off-like-off-stock']
      );
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['show-article-update-time']) {
      new ShowArticlesUpToTimeContent().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['show-stock-counts']) {
      new ShowStockCountsContent().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['mute-users'] && settings['mute-user-article']) {
      new MuteUserArticleContent().run(settings['mute-users']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['mute-users'] && settings['mute-user-comment']) {
      new MuteUserCommentContent().run(settings['mute-users']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

  try {
    if (settings['copy-code']) {
      new CopyCodeContent().run(settings['show-line-number']);
    }
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

  try {
    if (settings['fix-header']) {
      new FixHeader().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
