import ArticleDomHandler from './article-dom-handler.js';

export default class ShowLineNumberContent {

  run() {
    require('style-loader!./show-line-number-content.css');

    const handler = new ArticleDomHandler();
    const codeFrames = handler.getCodeFrames();

    for (let codeFrame of codeFrames) {
      const length = codeFrame.codeElement.textContent.split(/\n/).length - 1;
      let numbers = document.createElement('pre');
      numbers.className = 'qa-khsk-codeNumber';
      for (let i = 0; i < length; ++i) {
        const number = ('  ' + (i + 1)).slice(-3); // 桁数は3桁想定

        let label = document.createElement('span');
        label.innerHTML = number + '\n'; // Textでは改行が反映されない
        label.dataset.lineNumber = i + 1;

        numbers.appendChild(label);
      }

      codeFrame.codeBaseElement.insertBefore(numbers, codeFrame.codeElement);
    }

  }

}
