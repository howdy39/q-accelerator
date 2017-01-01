export default class ChromeStorage {

  // TODO: TEST
  static getHistories(callback) {
    chrome.storage.local.get('histories', function (items) {
      const data = items.histories || {};
      callback(data);
    });
  }

  // TODO: TEST
  static saveHistories(histories, callback) {
    chrome.storage.local.set({histories}, () => {
      callback();
    });
  }

  // TODO: TEST
  static getSettings(callback) {
    chrome.storage.local.get('settings', function (items) {
      const data = items.settings || {};
      callback(data);
    });
  }

  // TODO: TEST
  static saveSettings(settings, callback) {
    chrome.storage.local.set({settings}, () => {
      callback();
    });
  }

}