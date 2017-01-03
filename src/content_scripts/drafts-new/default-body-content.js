import DraftsNewDomHandler from './drafts-new-dom-handler.js';

export default class DefaultBodyContent {

  run(defaultBodyTemplate) {
    const handler = new DraftsNewDomHandler();

    if (handler.getDraftBody() === '') { // 間違って上書きしないように念のために設定
      handler.setDraftBody(defaultBodyTemplate);
    }
  }

}
