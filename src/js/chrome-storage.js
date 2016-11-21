export default class ChromeStorage {

  // TODO: TEST
  static getHistory(callback) {
    chrome.storage.local.get('history', function(items) {
      const data = items.history;
      callback(data);
    });
  }

  // TODO: TEST
  static saveHistory(history, callback) {
    chrome.storage.local.set({history}, () => {
      callback();
    });
  }

}