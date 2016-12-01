export default class ChromeStorage {

  // TODO: TEST
  static getHistory(callback) {
    chrome.storage.local.get('history', function(items) {
      const data = items.history || {};
      callback(data);
    });
  }

  // TODO: TEST
  static saveHistory(history, callback) {
    chrome.storage.local.set({history}, () => {
      callback();
    });
  }

  // TODO: TEST
  static getSettings(callback) {
    chrome.storage.local.get('settings', function(items) {
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