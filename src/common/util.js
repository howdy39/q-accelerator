import objectAssign from 'object-assign';
import ChromeStorage from './chrome-storage';

export default class Util {

  static parseUrl(url) {
    const ITEM_MATCH = '(https?://qiita.com)?/([^/]+)/(items|private)/([^/#?]+).*';
    const [ , , userId, itemKind, itemId] = url.match(ITEM_MATCH);
    return {userId, itemKind, itemId};
  }

  static createHistoryEntity(url, title, date) {
    const {userId, itemKind, itemId} = Util.parseUrl(url);

    const itemKey = `${userId}.${itemId}`;
    const entity = {};
    entity[itemKey] = {
      userId,
      itemKind,
      itemId,
      title,
      date
    };
    return entity;
  }

  static removeOldHistories(histories, maxSize = 1000) {
    const sortedHistories = Object.values(histories).sort((itemA, itemB) => (itemA.date < itemB.date) ? 1 : -1);
    if (sortedHistories.length < maxSize) {
      return histories;
    }

    const items = Object.values(histories).sort((itemA, itemB) => (itemA.date > itemB.date) ? 1 : -1);

    const removeSize = sortedHistories.length - maxSize;

    for (let i = 0; i < removeSize; i++) {
      let removeItem = items.shift();
      let key = `${removeItem.userId}.${removeItem.itemId}`;
      delete histories[key];
    }
    return histories;
  }

  static saveHistory(url, title, date, callback = function () {} ) {
    const entity = this.createHistoryEntity(url, title, date);

    this.getHistories((histories) => {
      objectAssign(histories, entity);
      histories = this.removeOldHistories(histories);
      ChromeStorage.saveHistories(
        histories,
        () => {
          this.infoLog('閲覧履歴を保存', url);
          callback();
        }
      );
    });
  }

  static getHistories(callback) {
    ChromeStorage.getHistories((histories) => {
      callback(histories);
    });
  }

  static clearHistories(callback = function () {}) {
    ChromeStorage.saveHistories(
      {},
      () => {
        this.infoLog('閲覧履歴を消去');
        callback();
      }
    );
  }

  // TODO: TEST
  static saveSetting(key, value, callback = function () {}) {
    let entity = {};
    entity[key] = value;

    this.getSettings(settings => {
      objectAssign(settings, entity);
      ChromeStorage.saveSettings(
        settings,
        () => {
          const message = JSON.stringify(entity);
          this.infoLog('設定を保存', message);
          callback();
        }
      );
    });
  }

  static getSettings(callback) {
    ChromeStorage.getSettings(settings => {
      const defaultSettings = require('./default-settings.json');
      defaultSettings['default-body-template'] = require('./default-body-template.md');

      objectAssign(defaultSettings, settings);

      callback(defaultSettings);
    });
  }

  /**
   * markdownのDiff構文を解析
   * -（マイナス）で始まる行を消す
   * +（プラス）で始まる行の+を消す
   */
  static parseDiffCode(code) {
    const lines = code.split('\n');
    const MINUS_REGEXP = /^-+.*$/;
    const PLUS_REGEXP = /^\++(.*$)/;

    const newLines = lines
      .filter(line => !MINUS_REGEXP.test(line))
      .map(line => {
        if (!PLUS_REGEXP.test(line)) return line;

        const [, newLine] = line.match(/^\++(.*$)/);
        return newLine;
      });
    return newLines.join('\n');
  }

  static infoLog(...messages) {
    messages.unshift('');
    let resultMessage = 'Q Accelerator' + messages.join(' | ');
    console.info(resultMessage);
  }

  static errorLog(e) {
    let messages = [
      '',
      e.message,
      e.stack
    ];
    let resultMessage = 'Q Accelerator' + messages.join(' | ');
    console.error(resultMessage);
  }
}
