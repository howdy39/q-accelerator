import Util from '../../js/util';


export default class ArticleListTagsDomHandler {

  constructor() {
    this.article = {
      comments: [],
      references: []
    };

    // コメント部分
    const commentLinkElements = Array.from(document.querySelectorAll('.comment'));
    commentLinkElements.forEach(element => {
      const href = element.querySelector('.commentHeader_creator a').getAttribute('href'); // 例 '/howdy39'
      const userId = href.replace('/', '');

      const comment = {
        baseElement: element,
        userId
      };

      this.article.comments.push(comment);
    }, this);

    // この記事は以下の記事からリンクされていますの参照記事部分
    const referenceLinkElements = Array.from(document.querySelectorAll('.references_reference a'));
    referenceLinkElements.forEach(element => {
      const baseElement = element.parentElement;
      const title = element.textContent.trim();
      const href = element.getAttribute('href');
      const {userId, itemId} = Util.parseUrl(href);

      const reference = {
        baseElement,
        href,
        itemId,
        title,
        userId
      };

      this.article.references.push(reference);
    }, this);

  }

  getArticle() {
    return this.article;
  }

  unShowComment(comment) {
    comment.baseElement.style.display = 'none';
  }

  unShowReference(reference) {
    reference.baseElement.style.display = 'none';
  }

}
