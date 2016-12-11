import Util from '../../js/util';


export default class PopularItemsDomHandler {

  constructor() {
    this.articleObjects = [];
    const articleLinkElements = Array.from(
      document.querySelectorAll('a.popularItem_articleTitle_text'));

    articleLinkElements.forEach((element) => {
      const baseElement = element.parentElement.parentElement;
      const description = baseElement.querySelector('.popularItem_articleBody').textContent.replace(/\n/g, '');
      const likeCount = baseElement.querySelector('.popularItem_likeCount_number').textContent.trim();
      const time = baseElement.querySelector('.popularItem_time').textContent;
      const title = element.textContent;
      const tags = Array.from(baseElement.querySelectorAll('.popularItem_tags_item')).map(element => element.textContent);

      const href = element.getAttribute('href');
      const {userId, itemId} = Util.parseUrl(href);

      let article = {
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

      this.articleObjects.push(article);
    }, this);
    console.log(this.articleObjects);
  }

  getArticleObjects() {
    return this.articleObjects;
  }

  unShow(article, divName) {
    article.baseElement.style.display = 'none';
    Util.infoLog(`"${article.title}"を非表示にしました`, divName);
  }

}
