import Util from '../common/util';
import AutoLikeContent from './article/auto-like-content.js';
import CopyCodeContent from './article/copy-code-content.js';
import SaveHisotoryContent from './article/save-history.js';
import ShowArticlesUpToTimeContent from './article/show-articles-up-to-time-content.js';
import ShowLineNumberContent from './article/show-line-number-content.js';
import ShowStockCountsContent from './article/show-stock-counts-content.js';
import ShowLangNameContent from './article/show-lang-name-content.js';

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
    if (settings['copy-code']) {
      new CopyCodeContent().run(settings['show-line-number'], settings['show-lang-name']);
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
    if (settings['show-lang-name']) {
      new ShowLangNameContent().run();
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
