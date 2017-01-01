import Util from '../../js/util';


export default class ArticleDomHandler {

  constructor() {
    this.article = {
      url: '',
      title: '',
      likeButtons: [],
      stockButtons: [],
      codeFrames: [],
      comments: [],
      references: []
    };

    // URL
    this.article.url = window.location.href;

    // タイトル
    this.article.title = document.querySelector('.col-sm-9 > h1').textContent;

    // いいねボタン
    this.article.likeButtons = document.querySelectorAll('div.js-likebutton button.p-button');

    // ストックボタン
    this.article.stockButtons = document.querySelectorAll('div.js-stockButton.StockButton');

    // コードフレーム
    const codeFrameElements = Array.from(document.getElementsByClassName('code-frame'));
    codeFrameElements.forEach(element => {
      const dataLang = element.getAttribute('data-lang');

      let fileName = '';
      const fileNameElement = element.querySelector('.code-lang span');
      // ファイル名が指定されていない場合もある
      if (fileNameElement) {
        fileName = fileNameElement.textContent;
      }

      const codeBaseElement = element.querySelector('.highlight');
      const codeElement = codeBaseElement.querySelector('pre');
      const codeText = codeElement.textContent;

      const codeFrame = {
        baseElement: element,
        dataLang,
        fileName,
        codeBaseElement,
        codeElement,
        codeText,
      };

      this.article.codeFrames.push(codeFrame);
    }, this);

    // コメント部分
    const commentLinkElements = Array.from(document.querySelectorAll('.comment'));
    commentLinkElements.forEach(element => {
      let userId;
      const a = element.querySelector('.commentHeader_creator a');
      if (a) { // 削除されたコメントの場合取得できない
        userId = a.getAttribute('href').replace('/', ''); // href例 '/howdy39'
      }
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
    return (this.article.likeButtons.length !== 0);
  }

  isLiked() {
    return this.article.likeButtons[0].className.indexOf('liked') > 0;
  }

  isStocked() {
    return this.article.stockButtons[0].className.indexOf('StockButton--stocked') > 0;
  }

  addLike() {
    this.article.likeButtons[0].click();
  }

  addStock() {
    this.article.stockButtons[0].click();
  }

  addLikeButtonClickListener(listener) {
    this.article.likeButtons.forEach(likeButton => {
      likeButton.addEventListener('click', listener);
    });
  }

  addStockButtonClickListener(listener) {
    this.article.stockButtons.forEach(stockButton => {
      stockButton.addEventListener('click', listener);
    });
  }

  unShowComment(comment) {
    comment.baseElement.style.display = 'none';
  }

  unShowReference(reference) {
    reference.baseElement.style.display = 'none';
  }

}
