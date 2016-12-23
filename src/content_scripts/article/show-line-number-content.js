import ArticleDomHandler from './article-dom-handler.js';

export default class ShowLineNumberContent {

  run() {
    require('style!./show-line-number-content.css');

    const handler = new ArticleDomHandler();
    const article = handler.getArticle();

    for (let codeFrame of article.codeFrames) {
      const codes = codeFrame.querySelectorAll('div.highlight pre');

      for (let code of codes) {
        const rows = code.innerText.split('\n');
        // 最後に改行が入っていることにより、空要素が生まれるため削除
        rows.pop();
        const length = rows.length;
        let numbers = document.createElement('pre');
        numbers.className = 'qa-khsk-codeNumber';
        for (let i = 0; i < length; ++i) {
          const number = ('  ' + (i + 1)).slice(-3); // 桁数は3桁想定

          let label = document.createElement('span');
          label.innerHTML = number + '\n'; // Textでは改行が反映されない
          label.dataset.lineNumber = i + 1;

          numbers.appendChild(label);
        }

        code.parentElement.insertBefore(numbers, code);
      }
    }

  }

}
