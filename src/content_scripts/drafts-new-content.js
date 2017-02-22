import Util from '../common/util';
import DefaultBodyContent from './drafts-new/default-body-content.js';

Util.getSettings(settings => {

  try {
    if (settings['default-body']) {
      new DefaultBodyContent().runByDefaultBody(settings['default-body-template']);
    } else if (settings['default-body-url']) {
      new DefaultBodyContent().runByDefaultBodyUrl(settings['default-body-url-template']);
    }
  } catch (e) {
    Util.errorLog(e);
  }

});
