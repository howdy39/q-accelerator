import objectAssign from 'object-assign';
import Util from '../../src/common/util';
import ChromeStorage from '../../src/common/chrome-storage';


describe('Util.parseUrl()', function () {

  it('userId,itemKind,itemIdが取れること', function () {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（https）', function () {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（相対パス）', function () {
    const URL = '/howdy39/items/35729490b024ca295d6c';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });


  it('userId,itemKind,itemIdが取れること（末尾スラッシュあり）', function () {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c/';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（GETパラメータあり）', function () {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（末尾スラッシュ/GETパラメータあり）', function () {
    const URL = 'https://qiita.com/howdy39/items/35729490b024ca295d6c/?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（ハッシュフラグメントあり）', function () {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c#%E3%81%93%E3%81%93%E3%81%BE%E3%81%A7%E3%81%AE%E5%9B%B3%E8%A7%A3';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('items');
    expect(itemId).to.equal('35729490b024ca295d6c');
  });

  it('userId,itemKind,itemIdが取れること（非公開記事）', function () {
    const URL = 'http://qiita.com/howdy39/private/6dce297363c0c1beb6e1';
    const {userId, itemKind, itemId} = Util.parseUrl(URL);

    expect(userId).to.equal('howdy39');
    expect(itemKind).to.equal('private');
    expect(itemId).to.equal('6dce297363c0c1beb6e1');
  });

});

describe('Util.createHistoryEntity()', function () {

  it('返り値が{userId.itemId: {userId, itemId, title, date}の形式であること', function () {
    const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
    const TITLE = '図で理解するJavaScriptのプロトタイプチェーン';
    const DATE = '1479563977777';

    const entity = Util.createHistoryEntity(URL, TITLE, DATE);
    const expectedEntity = {
      'howdy39.35729490b024ca295d6c': {
        userId: 'howdy39',
        itemKind: 'items',
        itemId: '35729490b024ca295d6c',
        title: TITLE,
        date: DATE
      }
    };

    expect(JSON.stringify(entity)).to.equal(JSON.stringify(expectedEntity));
  });

});


describe('Util.saveHistory()', function () {
  let savedHitories;

  const URL = 'http://qiita.com/howdy39/items/35729490b024ca295d6c';
  const TITLE = '図で理解するJavaScriptのプロトタイプチェーン';
  const DATE = '1479563977777';

  beforeEach(function () {
    this.getHistoriesStub = sinon.stub(
      ChromeStorage,
      'getHistories',
      (callback) => {
        callback(savedHitories);
      }
    );

    this.saveHistoriesStub = sinon.stub(
      ChromeStorage,
      'saveHistories',
      (histories, callback) => {
        callback();
      }
    );
  });

  afterEach(function () {
    ChromeStorage.getHistories.restore();
    ChromeStorage.saveHistories.restore();
  });

  describe('履歴がない場合', function () {

    beforeEach(function () {
      savedHitories = {};
    });

    it('履歴が登録できること', function () {
      const expectedHistory =
        {
          'howdy39.35729490b024ca295d6c': {
            userId: 'howdy39',
            itemKind: 'items',
            itemId: '35729490b024ca295d6c',
            title: TITLE,
            date: DATE
          }
        };

      Util.saveHistory(URL, TITLE, DATE);
      expect(JSON.stringify(this.saveHistoriesStub.firstCall.args[0])).to.equal(JSON.stringify(expectedHistory));
    });

  });

  describe('履歴がある場合', function () {

    beforeEach(function () {
      savedHitories = {
        'howdy39.3b2b14ce73ec44c54f7b': {
          userId: 'howdy39',
          itemKind: 'items',
          itemId: '3b2b14ce73ec44c54f7b',
          title: 'GoogleのWebAPI設計とWebAPI設計のベストプラクティスを比較してみる',
          date: '1479563912537'
        }
      };
    });

    it('履歴が追加できること', function () {
      const expectedHistory = objectAssign({},
        savedHitories,
        {
          'howdy39.35729490b024ca295d6c': {
            userId: 'howdy39',
            itemKind: 'items',
            itemId: '35729490b024ca295d6c',
            title: TITLE,
            date: DATE
          }
        }
      );

      Util.saveHistory(URL, TITLE, DATE);
      expect(JSON.stringify(this.saveHistoriesStub.firstCall.args[0])).to.equal(JSON.stringify(expectedHistory));
    });

    it('同じ主キー(userId, itemId)の履歴がある場合にtitle, dateが更新されること', function () {
      const HISTORY_URL = 'http://qiita.com/howdy39/items/3b2b14ce73ec44c54f7b';
      const NEW_TITLE = 'GoogleのWebAPI設計とWebAPI設計のベストプラクティスを比較してみる----変更';
      const NEW_DATE = '1479563999999';
      const expectedHistory = {
        'howdy39.3b2b14ce73ec44c54f7b': {
          userId: 'howdy39',
          itemKind: 'items',
          itemId: '3b2b14ce73ec44c54f7b',
          title: NEW_TITLE,
          date: NEW_DATE
        }
      };

      Util.saveHistory(HISTORY_URL, NEW_TITLE, NEW_DATE);

      expect(JSON.stringify(this.saveHistoriesStub.firstCall.args[0])).to.equal(JSON.stringify(expectedHistory));
    });

  });

  describe('履歴が1010件ある場合', function () {

    beforeEach(function () {
      // savedHitories = {};

      for (let i = 0; i < 1010; i++) {
        let userId = `userId${i}`;
        let itemId = `itemId${i}`;
        let key = `${userId}.${itemId}`;

        let itemKind = 'items';
        let title = `title${i}`;
        let date = (new Date()).getTime() + getRandomArbitary(0, 100 * 24 * 60 * 1000); // 1ヶ月間
        savedHitories[key] = {
          userId,
          itemKind,
          itemId,
          title,
          date,
        };
      }

      function getRandomArbitary(min, max) {
        return Math.random() * (max - min) + min;
      }

    });

    it('最大件数1000件以上保存しないこと', function () {
      const HISTORY_URL = 'http://qiita.com/howdy39/items/3b2b14ce73ec44c54f7b';
      const NEW_TITLE = 'GoogleのWebAPI設計とWebAPI設計のベストプラクティスを比較してみる----変更';
      const NEW_DATE = '1479563999999';

      Util.saveHistory(HISTORY_URL, NEW_TITLE, NEW_DATE);

      const historyArg = this.saveHistoriesStub.firstCall.args[0];
      expect(Object.keys(historyArg)).to.have.lengthOf(1000);
    });

  });

  it('callbackを渡した場合に呼ばれること', function () {
    const callback = sinon.spy(function () {});

    Util.clearHistories(callback);

    expect(callback.called).to.be.true;
  });

});


describe('Util.removeOldHistories()', function () {
  let savedHitories;

  beforeEach(function () {
    this.getHistoriesStub = sinon.stub(
      ChromeStorage,
      'getHistories',
      (callback) => {
        callback(savedHitories);
      }
    );

    this.savedHitories = {
      'howdy39.notold01': {
        userId: 'howdy39',
        itemKind: 'items',
        itemId: 'notold01',
        title: '古くない記事01',
        date: '1479563912510'
      },
      'howdy39.old': {
        userId: 'howdy39',
        itemKind: 'items',
        itemId: 'old',
        title: '古い記事',
        date: '1479563912500'
      },
      'howdy39.notold02': {
        userId: 'howdy39',
        itemKind: 'items',
        itemId: 'notold02',
        title: '古くない記事02',
        date: '1479563912520'
      }
    };
  });

  afterEach(function () {
    ChromeStorage.getHistories.restore();
  });

  it('古い記事が削除されること', function () {
    const histories = Util.removeOldHistories(this.savedHitories, 2);
    expect(Object.keys(histories)).to.have.lengthOf(2, 'length');
    expect(histories['howdy39.notold01']).to.not.be.equal(undefined, 'howdy39.notold01');
    expect(histories['howdy39.old']).to.be.equal(undefined, 'howdy39.old');
    expect(histories['howdy39.notold02']).to.not.be.equal(undefined, 'howdy39.notold02');
  });

});


describe('Util.getHistories()', function () {

  beforeEach(function () {
    this.getHistoriesStub = sinon.stub(
      ChromeStorage,
      'getHistories',
      (callback) => {
        callback({});
      }
    );
  });

  afterEach(function () {
    ChromeStorage.getHistories.restore();
  });

  it('callbackを渡した場合に呼ばれること', function () {
    const callback = sinon.spy(function () {});

    Util.getHistories(callback);

    expect(callback.called).to.be.true;
  });

});


describe('Util.clearHistories()', function () {

  beforeEach(function () {
    this.saveHistoriesStub = sinon.stub(
      ChromeStorage,
      'saveHistories',
      (history, callback) => {
        callback();
      }
    );
  });

  afterEach(function () {
    ChromeStorage.saveHistories.restore();
  });

  it('callbackを渡した場合に呼ばれること', function () {
    const callback = sinon.spy(function () {});

    Util.clearHistories(callback);

    expect(callback.called).to.be.true;
  });

});


describe('Util.saveSetting()', function () {
  let savedSettings;

  beforeEach(function () {
    savedSettings = {key1: 'value1'};

    this.getSettingStub = sinon.stub(
      Util,
      'getSettings',
      (callback) => {
        callback(savedSettings);
      }
    );

    this.saveSettingsStub = sinon.stub(
      ChromeStorage,
      'saveSettings',
      (Settings, callback) => {
        callback();
      }
    );
  });

  afterEach(function () {
    Util.getSettings.restore();
    ChromeStorage.saveSettings.restore();
  });

  it('新しいキーが登録できること', function () {
    const expectedSetting =
      {
        key1: 'value1',
        key2: 'newValue2'
      };

    Util.saveSetting('key2', 'newValue2');

    const settings = this.saveSettingsStub.firstCall.args[0];
    expect(settings).to.deep.equal(expectedSetting);
  });

  it('キーの設定が更新できること', function () {
    const expectedSetting =
      {
        key1: 'newValue1',
      };

    Util.saveSetting('key1', 'newValue1');

    const settings = this.saveSettingsStub.firstCall.args[0];
    expect(settings).to.deep.equal(expectedSetting);
  });

  it('callbackを渡した場合に呼ばれること', function () {
    const callback = sinon.spy(function () {});

    Util.saveSetting('key', 'value', callback);

    expect(callback.called).to.be.true;
  });

});


describe('Util.getSettings()', function () {

  describe('設定が登録されていない場合', function () {
    beforeEach(function () {
      this.getSettingsStub = sinon.stub(
        ChromeStorage,
        'getSettings',
        (callback) => {
          callback({});
        }
      );
    });

    afterEach(function () {
      ChromeStorage.getSettings.restore();
    });

    it('callbackを渡した場合に呼ばれること', function () {
      const callback = sinon.spy(function () {});

      Util.getSettings(callback);

      expect(callback.called).to.be.true;
    });

    it('デフォルト設定で上書きされること', function () {
      const callback = sinon.spy(function () {});
      const expectedSettings = {};
      Object.assign(expectedSettings, require('../../src/common/default-settings.json'));
      expectedSettings['default-body-template'] = require('../../src/common/default-body-template.md');

      Util.getSettings(callback);

      const settings = callback.firstCall.args[0];
      expect(settings).to.deep.equal(expectedSettings);
    });
  });

  describe('設定が一部登録されている場合', function () {
    beforeEach(function () {
      this.getSettingsStub = sinon.stub(
        ChromeStorage,
        'getSettings',
        (callback) => {
          callback({
            'mute-user-comment': false,
            'default-body-template': '#上書き',
          });
        }
      );
    });

    afterEach(function () {
      ChromeStorage.getSettings.restore();
    });

    it('設定されていない項目がデフォルト設定で上書きされること', function () {
      const callback = sinon.spy(function () {});
      const expectedSettings = {};
      Object.assign(expectedSettings, require('../../src/common/default-settings.json'));
      expectedSettings['default-body-template'] = '#上書き';
      expectedSettings['mute-user-comment'] = false;

      Util.getSettings(callback);

      const settings = callback.firstCall.args[0];
      expect(settings).to.deep.equal(expectedSettings);
    });
  });

});


describe('Util.parseDiffCode()', function () {

  it('-（マイナス）行を除外すること', function () {
    const code =
`
-   マイナス1つ
--   マイナス2つ
---   マイナス3つ
 -   行頭スペースあり
`;
    const expectedCode =
`
 -   行頭スペースあり
`;

    const res = Util.parseDiffCode(code);
    expect(res).to.equal(expectedCode);
  });

  it('+（プラス）を除いて行を残すこと', function () {
    const code =
`
+   プラス1つ
++   プラス2つ
+++   プラス3つ
 +   行頭ハイフンあり
`;
    const expectedCode =
`
   プラス1つ
   プラス2つ
   プラス3つ
 +   行頭ハイフンあり
`;

    const res = Util.parseDiffCode(code);
    expect(res).to.equal(expectedCode);
  });

});
