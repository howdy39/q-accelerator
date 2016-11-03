const assert = require('power-assert');
const Util = require('../../src/js/util');

describe('parseUrl', function() {

  it('userIdとItemIdが取れること', function() {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const { userId, itemId} = Util.parseUrl(URL);
    assert(userId === 'howdy39');
    assert(itemId === '35729490b024ca295d6c');
  });

});