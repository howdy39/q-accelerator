class Util {
  static parseUrl(url) {
    const ITEM_MATCH = 'https?://qiita.com/([^/]+)/items/([^/?]+).*';
    const [ , userId, itemId] = url.match(ITEM_MATCH);
    return {userId, itemId};
  }

  static getItemKey(url) {
    const {userId, itemId} = Util.parseUrl(url);
    return `${userId}.${itemId}`;
  }

  static saveUrl(url, cb = function() {} ) {
    const itemKey = Util.getItemKey(url);
    const entity = {itemKey};

    chrome.storage.local.set(entity, function() {
      console.info('stored', itemKey);
      cb();
    });
  }
}
module.exports = Util;