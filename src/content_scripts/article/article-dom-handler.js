import Util from '../../js/util';


export default class ArticleListTagsDomHandler {

  constructor() {
    this.article = {comments: []};

    const commentLinkElements = Array.from(document.querySelectorAll('.comment'));

    commentLinkElements.forEach(element => {
      const userHref = element.querySelector('.commentHeader_creator a').getAttribute('href'); // 例 '/howdy39'
      const userId = userHref.replace('/', '');

      const comment = {
        baseElement: element,
        userId
      };

      this.article.comments.push(comment);
    }, this);
  }

  getArticle() {
    return this.article;
  }

  unShowComment(comment, divName) {
    comment.baseElement.style.display = 'none';
    Util.infoLog(`"${comment.userId}"を非表示にしました`, divName);
  }

}
