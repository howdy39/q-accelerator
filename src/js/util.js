export default class Util {
  static parseUrl(url) {
    const ITEM_MATCH = 'https?://qiita.com/([^/]+)/items/([^/?]+).*';
    const [ , userId, itemId] = url.match(ITEM_MATCH);
    return {userId, itemId};
  }

  static getItemKey(url) {
    const {userId, itemId} = Util.parseUrl(url);
    return `${userId}.${itemId}`;
  }

  static createItemEntity(url) {
    const itemKey = Util.getItemKey(url);
    const entity = {};
    entity[itemKey] = itemKey;
    return entity;
  }

  static saveUrl(url, cb = function() {} ) {
    const entity = this.createItemEntity(url);

    chrome.storage.local.set(entity, function() {
      let itemKey;
      for (let key in entity) {
        itemKey = key;
      }
      console.info('stored', itemKey);
      cb();
    });
  }
}
