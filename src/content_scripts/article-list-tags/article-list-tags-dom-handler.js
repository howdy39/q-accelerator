import Util from '../../js/util';

export default class ArticleListTagsDomHandler {

  constructor() {
    this.articles = [];

    const articleLinkElements = Array.from(
      document.querySelectorAll('.ItemLink__title a'));

    articleLinkElements.forEach(element => {
      const baseElement = element.parentElement.parentElement.parentElement;
      let likeCount = 0;
      let likeLi;
      if ((likeLi = baseElement.querySelectorAll('.ItemLink__status li')[0])) {
        likeCount = Number(likeLi.textContent.trim());
      }
      const title = element.textContent.trim();
      const tags = Array.from(baseElement.querySelectorAll('.TagList li'))
        .map(element => element.textContent.trim());
      const href = element.getAttribute('href');
      const {userId, itemId} = Util.parseUrl(href);

      const article = {
        baseElement,
        href,
        itemId,
        likeCount,
        title,
        userId,
        tags
      };

      this.articles.push(article);
    }, this);
  }

  getArticles() {
    return this.articles;
  }

  unShow(article) {
    article.baseElement.style.display = 'none';
  }

}
