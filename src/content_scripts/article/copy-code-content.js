import ClipBoard from 'clipboard';
import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class CopyCodeContent {

  run(showLineNumber) {
    require('style-loader!./copy-code-content.css');

    const handler = new ArticleDomHandler();
    const codeFrames = handler.getCodeFrames();

    for (let codeFrame of codeFrames) {

      // 行番号が非表示設定かつタイトルがない場合
      if (!showLineNumber && codeFrame.codeLang === '') {
        codeFrame.codeElement.style = 'padding-top: 1.4em';
      }
      const svg = document.createElement('img');
      svg.src = chrome.extension.getURL('assets/images/clippy.svg');
      svg.alt = 'Copy to clipboard';
      svg.className = 'qa-clippy';

      const button = document.createElement('button');
      button.appendChild(svg);
      button.className = 'qa-copy-code';

      button.addEventListener('mouseleave', function (e) {
        e.currentTarget.setAttribute('class', 'qa-copy-code');
        e.currentTarget.removeAttribute('aria-label');
      });

      const clipboard = new ClipBoard(button, {
        text: () => {
          const diffLangueges = ['diff', 'udiff'];
          if (!diffLangueges.includes(codeFrame.dataLang.toLowerCase())) {
            return codeFrame.codeText;
          }
          return this.parseDiffCode(codeFrame.codeText);
        }
      });
      clipboard.on('success', e => {
        e.clearSelection();
        this.showTooltip(e.trigger, 'Copied!');
        Util.infoLog('コピー機能', 'コピーに成功しました');
      });

      clipboard.on('error', function (e) {
        Util.errorLog(e);
      });

      const allSvg = document.createElement('img');
      allSvg.src = chrome.extension.getURL('assets/images/all_clippy.svg');
      allSvg.alt = 'Copy to clipboard';
      allSvg.className = 'qa-clippy';

      const allButton = document.createElement('button');
      allButton.appendChild(allSvg);
      allButton.className = 'qa-copy-all-code';

      allButton.addEventListener('mouseleave', function (e) {
        e.currentTarget.setAttribute('class', 'qa-copy-all-code');
        e.currentTarget.removeAttribute('aria-label');
      });

      const allClipboard = new ClipBoard(allButton, {
        text: () => {
          const diffLangueges = ['diff', 'udiff'];
          if (!diffLangueges.includes(codeFrame.dataLang.toLowerCase())) {
            return codeFrame.codeText;
          }
          return this.parseAllCode(codeFrame.codeText);
        }
      });

      allClipboard.on('success', e => {
        e.clearSelection();
        this.showTooltipAll(e.trigger, 'Copied!');
        Util.infoLog('コピー機能', 'コピーに成功しました');
      });

      allClipboard.on('error', function (e) {
        Util.errorLog(e);
      });

      // コピーボタンをコードの上に追加
      codeFrame.baseElement.insertBefore(button, codeFrame.codeBaseElement);
      codeFrame.baseElement.insertBefore(allButton, codeFrame.codeBaseElement);
    }
  }

  showTooltip(elem, msg) {
    elem.setAttribute('class', 'qa-copy-code tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
  }

  parseDiffCode(code) {
    return Util.parseDiffCode(code);
  }
}
