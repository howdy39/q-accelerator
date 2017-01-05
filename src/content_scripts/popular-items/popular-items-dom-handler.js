import Util from '../../common/util';

export default class PopularItemsDomHandler {

  constructor() {
    this.articles = [];
    const articleLinkElements = document.querySelectorAll('a.popularItem_articleTitle_text');

    for (let element of articleLinkElements) {
      const baseElement = element.parentElement.parentElement;
      const description = baseElement.querySelector('.popularItem_articleBody').textContent.replace(/\n/g, '');
      const likeCount = Number(baseElement.querySelector('.popularItem_likeCount_number').textContent.trim());
      const time = baseElement.querySelector('.popularItem_time').textContent;
      const title = element.textContent;
      const tags = Array.from(baseElement.querySelectorAll('.popularItem_tags_item')).map(element => element.textContent);

      const href = element.getAttribute('href');
      const {userId, itemId} = Util.parseUrl(href);

      const article = {
        baseElement,
        description,
        href,
        itemId,
        likeCount,
        time,
        title,
        userId,
        tags
      };

      this.articles.push(article);
    }
  }

  getArticles() {
    return this.articles;
  }

  unShow(article) {
    article.baseElement.style.display = 'none';
  }

  addAlreadyReadButton(callback) {
    for (const article of this.articles) {
      const a = document.createElement('a');
      a.className = 'qa-already-button btn btn-primary btn-sm';
      a.style.marginRight = '10px';

      const i = document.createElement('i');
      i.className = 'fa fa-check';

      const text = document.createTextNode('既読');
      a.appendChild(i);
      a.appendChild(text);

      a.addEventListener('click', () => {
        callback(article.href, article.title);
        this.unShow(article);
      });
      article.baseElement.firstChild.insertBefore(a, article.baseElement.firstChild.firstChild);
    }
  }
}
