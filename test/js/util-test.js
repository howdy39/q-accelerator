const assert = require('power-assert');
const Util = require('../../src/js/util');

describe('parseUrl', function() {

  it('userIdとItemIdが取れること', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

  it('userIdとItemIdが取れること（https）', function() {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

  it('userIdとItemIdが取れること（末尾スラッシュあり）', function() {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c/';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

  it('userIdとItemIdが取れること（GETパラメータあり）', function() {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

  it('userIdとItemIdが取れること（末尾スラッシュ/GETパラメータあり）', function() {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c/?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

});


describe('getItemKey', function() {

  it('userId.ItemIdの形式であること', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const itemKey = Util.getItemKey(URL);
    assert(itemKey === 'howdy39.35729490b024ca295d6c');
  });

});