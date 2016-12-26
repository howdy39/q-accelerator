import Util from '../../js/util';


export default class ArticleDomHandler {

  constructor() {
    this.article = {
      url: '',
      title: '',
      likeButton: null,
      stockButton: null,
      codeFrames: [],
      comments: [],
      references: []
    };

    // URL
    this.article.url = window.location.href;

    // タイトル
    this.article.title = document.querySelector('.col-sm-9 > h1').textContent;

    // いいねボタン
    this.article.likeButton = document.querySelector('button.p-button');

    // ストックボタン
    this.article.stockButton = document.querySelector('div.js-stockButton.StockButton');

    // コードフレーム
    this.article.codeFrames = document.getElementsByClassName('code-frame');

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

  /**
   * 自身が投稿した記事は「いいね」ができないためその判定に使用する
   */
  isLikeButtonAvailable() {
    return (this.article.likeButton !== null);
  }

  isLiked() {
    return this.article.likeButton.className.indexOf('liked') > 0;
  }

  isStocked() {
    return this.article.stockButton.className.indexOf('StockButton--stocked') > 0;
  }

  addLike() {
    this.article.likeButton.click();
  }

  addStock() {
    this.article.stockButton.click();
  }

  addLikeButtonClickListener(listener) {
    this.article.likeButton.addEventListener('click', listener);
  }

  addStockButtonClickListener(listener) {
    this.article.stockButton.addEventListener('click', listener);
  }

  unShowComment(comment) {
    comment.baseElement.style.display = 'none';
  }

  unShowReference(reference) {
    reference.baseElement.style.display = 'none';
  }

}
