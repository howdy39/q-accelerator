/* eslint-disable import/no-extraneous-dependencies */

import assert from 'power-assert';
import Util from '../../src/js/util';

describe('util.parseUrl()', function() {

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

  it('userIdとItemIdが取れること（ハッシュフラグメントあり）', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c#%E3%81%93%E3%81%93%E3%81%BE%E3%81%A7%E3%81%AE%E5%9B%B3%E8%A7%A3';
    const {userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

});


describe('util.getItemKey()', function() {

  it('返り値がuserId.ItemIdの形式であること', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const itemKey = Util.getItemKey(URL);
    assert(itemKey === 'howdy39.35729490b024ca295d6c');
  });

});

describe('util.createItemEntity()', function() {

  it('返り値が{userId.ItemId: userId.ItemId}の形式であること', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const entity = Util.createItemEntity(URL);
    assert(entity['howdy39.35729490b024ca295d6c'] === 'howdy39.35729490b024ca295d6c');
  });

});