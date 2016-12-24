import Util from '../js/util.js';

/**
 * @see https://developer.chrome.com/extensions/runtime#event-onInstalled
 */
function onInstalled(details) {
  Util.infoLog(`onInstalled.reason:${details.reason}`);

  if (details.reason == 'install') {
    var newURL = chrome.extension.getURL('assets/settings.html');
    chrome.tabs.create({ url: newURL });
  }
}

chrome.runtime.onInstalled.addListener(onInstalled);
