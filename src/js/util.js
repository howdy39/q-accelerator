import ChromeStorage from './chrome-storage';

export default class Util {

  static parseUrl(url) {
    const ITEM_MATCH = '(https?://qiita.com)?/([^/]+)/items/([^/#?]+).*';
    const [ , , userId, itemId] = url.match(ITEM_MATCH);
    return {userId, itemId};
  }

  static createItemEntity(url, title, date) {
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

  // TODO: RENAME
  static saveHistory(url, title, date, callback = function() {} ) {
    const entity = this.createItemEntity(url, title, date);

    ChromeStorage.getHistory((history) => {
      Object.assign(history, entity);
      ChromeStorage.saveHistory(
        history,
        () => {
          console.log('saved:' + url);
          callback();
        }
      );
    });
  }

  // TODO: TEST
  static getHisotry(callback) {
    ChromeStorage.getHistory((history) => {
      callback(history);
    });
  }

}
