import Util from '../../js/util';


export default class ArticleListStreamDomHandler {

  constructor() {
    this.articles = [];
    const articleLinkElements = Array.from(
      document.querySelectorAll('div.item-box-title > h1 > a'));

    articleLinkElements.forEach(element => {
      const baseElement = element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      let likeCount = 0;
      var likeSpan;
      if ((likeSpan = baseElement.querySelector('.fa-like + span'))) {
        likeCount = likeSpan.textContent;
      }
      const title = element.textContent.trim();
      const tags = Array.from(baseElement.querySelectorAll('.item-box_tagList li'))
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

      this.articles.push(article);
    }, this);
  }

  getArticles() {
    return this.articles;
  }

  unShow(article, divName) {
    article.baseElement.style.display = 'none';
    Util.infoLog(`"${article.title}"を非表示にしました`, divName);
  }

  static getObserverItems() {
    return document.getElementsByClassName('streamContainer')[0];
  }
  static getObserverOptions() {
    return {childList: true, subtree:true};
  }

}
