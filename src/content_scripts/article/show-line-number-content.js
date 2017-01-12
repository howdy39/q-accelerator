import ArticleDomHandler from './article-dom-handler.js';

export default class ShowLineNumberContent {

  run() {
    require('style!./show-line-number-content.css');

    const handler = new ArticleDomHandler();
    const codeFrames = handler.getCodeFrames();

    for (let codeFrame of codeFrames) {
      const rows = codeFrame.codeText.split('\n');
      const length = rows.length;
      let numbers = document.createElement('pre');
      numbers.className = 'qa-khsk-codeNumber';
      for (let i = 0; i < length; ++i) {
        const number = ('  ' + (i + 1)).slice(-3); // 桁数は3桁想定

        let label = document.createElement('span');
        label.innerHTML = number + '\n'; // Textでは改行が反映されない
        if (i + 1 === length) {
          label.innerHTML += '\n'; // 最終行には改行が追加されるqiitaの仕様に合わせる
        }
        label.dataset.lineNumber = i + 1;

        numbers.appendChild(label);
      }

      codeFrame.codeBaseElement.insertBefore(numbers, codeFrame.codeElement);
    }

  }

}
