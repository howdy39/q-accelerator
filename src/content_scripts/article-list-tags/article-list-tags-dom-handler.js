import Util from '../../js/util';


export default class ArticleListTagsDomHandler {

  constructor() {
    this.articleObjects = [];

    const articleLinkElements = Array.from(
      document.querySelectorAll('.ItemLink__title a'));

    articleLinkElements.forEach((element) => {
      console.log(element);
      const baseElement = element.parentElement.parentElement.parentElement;
      let likeCount = 0;
      let likeLi;
      if ((likeLi = baseElement.querySelectorAll('.ItemLink__status li')[0])) {
        likeCount = likeLi.textContent.trim();
      }
      const title = element.textContent.trim();
      const tags = Array.from(baseElement.querySelectorAll('.TagList li'))
        .map(element => element.textContent.trim());
      const href = element.getAttribute('href');
      const {userId, itemId} = Util.parseUrl(href);

      let article = {
        baseElement,
        href,
        itemId,
        likeCount,
        title,
        userId,
        tags
      };

      this.articleObjects.push(article);
    }, this);
  }

  getArticleObjects() {
    return this.articleObjects;
  }

  unShow(article, divName) {
    article.baseElement.style.display = 'none';
    Util.infoLog(`"${article.title}"を非表示にしました`, divName);
  }

}
