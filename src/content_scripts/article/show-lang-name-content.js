import ArticleDomHandler from './article-dom-handler.js';

export default class ShowLineNumberContent {

  run() {
    const handler = new ArticleDomHandler();
    const codeFrames = handler.getCodeFrames();
    const ignoreLangueges = ['math'];

    for (let codeFrame of codeFrames) {
      if (ignoreLangueges.includes(codeFrame.dataLang.toLowerCase())) {
        continue;
      }

      const { baseElement, codeLang, dataLang } = codeFrame;

      if (codeLang) {
        const label = baseElement.querySelector('span');
        label.textContent = `${dataLang}:${label.textContent}`;
      } else {
        const newLangElement = document.createElement('div');
        newLangElement.className = 'code-lang';
        newLangElement.innerHTML = `<span class="bold">${dataLang}</span>`;
        baseElement.insertBefore(newLangElement, baseElement.firstElementChild);
      }
    }

  }

}
