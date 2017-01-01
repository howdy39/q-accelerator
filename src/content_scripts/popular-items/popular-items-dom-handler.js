import Util from '../../common/util';


export default class PopularItemsDomHandler {

  constructor() {
    this.articles = [];
    const articleLinkElements = Array.from(
      document.querySelectorAll('a.popularItem_articleTitle_text'));

    articleLinkElements.forEach((element) => {
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
    }, this);
  }

  getArticles() {
    return this.articles;
  }

  unShow(article) {
    article.baseElement.style.display = 'none';
  }

}
