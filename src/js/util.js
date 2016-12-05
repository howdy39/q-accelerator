import ChromeStorage from './chrome-storage';

export default class Util {

  static parseUrl(url) {
    const ITEM_MATCH = '(https?://qiita.com)?/([^/]+)/items/([^/#?]+).*';
    const [ , , userId, itemId] = url.match(ITEM_MATCH);
    return {userId, itemId};
  }

  static createHistoryEntity(url, title, date) {
    const {userId, itemId} = Util.parseUrl(url);

    const itemKey = `${userId}.${itemId}`;
    const entity = {};
    entity[itemKey] = {
      userId,
      itemId,
      title,
      date
    };
    return entity;
  }

  static saveHistory(url, title, date, callback = function() {} ) {
    const entity = this.createHistoryEntity(url, title, date);

    this.getHistories((histories) => {
      Object.assign(histories, entity);
      ChromeStorage.saveHistories(
        histories,
        () => {
          this.infoLog('saved:' + url);
          callback();
        }
      );
    });
  }

  static getHistories(callback = function() {}) {
    ChromeStorage.getHistories((histories) => {
      callback(histories);
    });
  }

  static clearHistories(callback = function() {}) {
    ChromeStorage.saveHistories(
      {},
      () => {
        this.infoLog('clear histories');
        callback();
      }
    );
  }

  // TODO: TEST
  static saveSetting(key, value, callback = function() {}) {
    let entity = {};
    entity[key] = value;

    this.getSettings(settings => {
      Object.assign(settings, entity);
      ChromeStorage.saveSettings(
        settings,
        () => {
          const message = JSON.stringify(entity);
          console.log(entity);
          this.infoLog(`saved: ${message}`);
          callback();
        }
      )
    });
  }

  // TODO: TEST
  static getSettings(callback = function() {}) {
    ChromeStorage.getSettings(settings => {
      callback(settings);
    });
  }

  static infoLog(message) {
    console.info(`Q Accelerator | ${message}`);
  }
}
