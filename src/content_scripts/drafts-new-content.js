import Util from '../common/util';
import DefaultBodyContent from './drafts-new/default-body-content.js';

Util.getSettings(settings => {

  try {
    if (settings['default-body']) {
      new DefaultBodyContent().run(settings['default-body-template']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
