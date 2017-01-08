export default class ChromeStorage {

  static getHistories(callback) {
    chrome.storage.local.get('histories', function (items) {
      const data = items.histories || {};
      callback(data);
    });
  }

  static saveHistories(histories, callback) {
    chrome.storage.local.set({histories}, () => {
      callback();
    });
  }

  static getSettings(callback) {
    chrome.storage.local.get('settings', function (items) {
      const data = items.settings || {};
      callback(data);
    });
  }

  static saveSettings(settings, callback) {
    chrome.storage.local.set({settings}, () => {
      callback();
    });
  }

}