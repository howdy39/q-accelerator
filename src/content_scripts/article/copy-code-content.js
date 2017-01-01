import ClipBoard from 'clipboard';
import Util from '../../common/util';
import ArticleDomHandler from './article-dom-handler.js';

export default class CopyCodeContent {

  run() {
    require('style!./copy-code-content.css');

    const handler = new ArticleDomHandler();
    const article = handler.getArticle();

    for (let codeFrame of article.codeFrames) {
      const svg = document.createElement('img');
      svg.src = chrome.extension.getURL('assets/images/clippy.svg');
      svg.alt = 'Copy to clipboard';
      svg.className = 'qa-clippy';

      const button = document.createElement('button');
      button.appendChild(svg);
      button.className = 'qa-copy-code'; // 「書き方」のマウスオーバーを拝借

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
          return this.parseDiffCode(codeFrame.codeText, codeFrame.dataLang);
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

      // コピーボタンをコードの上に追加
      codeFrame.baseElement.insertBefore(button, codeFrame.codeBaseElement);
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
