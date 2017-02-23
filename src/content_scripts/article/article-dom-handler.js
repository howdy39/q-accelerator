import moment from 'moment';
import Util from '../../common/util';

export default class ArticleDomHandler {

  constructor() {
    this.article = {
      titleElement: '',
      likeButtonElements: [],
      stockButtonElements: [],
      articleUpdateTimeElement: '',
      codeFrames: [],
      comments: [],
      references: []
    };

    // タイトル
    this.article.titleElement = document.querySelector('.col-sm-9 > h1');

    // いいねボタン
    this.article.likeButtonElements = document.querySelectorAll('div.js-likebutton button.p-button');

    // ストックボタン
    this.article.stockButtonElements = document.querySelectorAll('.StockButton button');

    // 記事の更新日時
    this.article.articleUpdateTimeElement = document.querySelector('.ArticleAsideHeader__date time');

    // コードフレーム
    const codeFrameElements = Array.from(document.getElementsByClassName('code-frame'));
    codeFrameElements.forEach(element => {
      const dataLang = element.getAttribute('data-lang');

      let codeLang = '';
      const codeLangElement = element.querySelector('.code-lang span');
      // ファイル名が指定されていない場合もある
      if (codeLangElement) {
        codeLang = codeLangElement.textContent;
      }

      const codeBaseElement = element.querySelector('.highlight');
      const codeElement = codeBaseElement.querySelector('pre:last-child');
      const codeText = codeElement.textContent.replace(/\n+$/, '');

      const codeFrame = {
        baseElement: element,
        dataLang,
        codeLang,
        codeBaseElement,
        codeElement,
        codeText,
      };

      this.article.codeFrames.push(codeFrame);
    });

    // コメント部分
    const commentLinkElements = Array.from(document.querySelectorAll('.comment'));
    commentLinkElements.forEach(element => {
      const commentHeaderElement = element.querySelector('.commentHeader');
      let isDeleted = false;
      let userId;
      let commentContentElement;

      if (commentHeaderElement) {
        commentContentElement = element.querySelector('.comment_content');
        const a = commentHeaderElement.querySelector('.commentHeader_creator a');
        userId = a.getAttribute('href').replace('/', ''); // href例 '/howdy39'
      } else {
        // 削除されたコメント
        isDeleted = true;
      }

      const comment = {
        baseElement: element,
        isDeleted,
        userId,
        commentHeaderElement,
        commentContentElement,
      };

      this.article.comments.push(comment);
    });

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

  getUrl() {
    return window.location.href;
  }

  getTitle() {
    return this.article.titleElement.textContent;
  }

  getLikeButtons() {
    return this.article.likeButtonElements;
  }

  getStockButtons() {
    return this.article.stockButtonElements;
  }

  getArticleUpdateTime() {
    return new Date(this.article.articleUpdateTimeElement.getAttribute('datetime'));
  }
  getArticleUpdateTimeTextContent() {
    return this.article.articleUpdateTimeElement.textContent;
  }

  getCodeFrames() {
    return this.article.codeFrames;
  }

  getComments() {
    return this.article.comments;
  }

  getReferences() {
    return this.article.references;
  }

  /**
   * 自身が投稿した記事は「いいね」ができないためその判定に使用する
   */
  isLikeButtonAvailable() {
    return (this.getLikeButtons().length !== 0);
  }

  prependCountToStock(count) {
    this.getStockButtons().forEach(stockButton => {
      const label = stockButton.querySelector('.StockButton__label');
      label.prepend(count);
    });
  }

  isLiked() {
    return this.getLikeButtons()[0].className.indexOf('liked') > 0;
  }

  isStocked() {
    return this.getStockButtons()[0].parentElement.className.indexOf('StockButton--stocked') > 0;
  }

  addLike() {
    this.getLikeButtons()[0].click();
  }

  addStock() {
    this.getStockButtons()[0].click();
  }

  addLikeButtonClickListener(listener) {
    this.getLikeButtons().forEach(likeButton => {
      likeButton.addEventListener('click', listener);
    });
  }

  addStockButtonClickListener(listener) {
    this.getStockButtons().forEach(stockButton => {
      stockButton.addEventListener('click', listener);
    });
  }

  showArticleUpdateTime() {
    const e = this.article.articleUpdateTimeElement;
    const d = new Date(e.getAttribute('datetime'));
    e.textContent = moment(d).format('YYYY年MM月DD日 HH時mm分');
  }

  unShowComment(comment) {
    comment.commentHeaderElement.style.display = 'none';
    comment.commentContentElement.style.display = 'none';

    const messageElement = document.createElement('div');
    messageElement.className = 'well';
    messageElement.textContent = `${comment.userId}のコメントを非表示にしました。`;
    comment.baseElement.appendChild(messageElement);
  }

  unShowReference(reference) {
    reference.baseElement.style.display = 'none';
  }

}
