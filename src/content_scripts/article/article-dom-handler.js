import moment from 'moment';
import Util from '../../common/util';

export default class ArticleDomHandler {

  static getLikeObserverElement() {
    return document.getElementsByClassName('p-items_stickyMenu')[0];
  }

  static getStockObserverElement() {
    return document.getElementsByClassName('p-items_stickyMenu')[0];
  }

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
    this.article.titleElement = document.querySelector('.it-Header_title');

    // いいねボタン
    const leftAreaLikeButton = document.querySelector('div.it-Actions_item-like button');
    const headerLikeButton = document.querySelector('div.it-ActionsMobile_like');
    const footerLikeButton = document.querySelector('div.u-flex-align-center div.LikeButton button.p-button');

    if (leftAreaLikeButton) {
      this.article.likeButtonElements.push(leftAreaLikeButton);
    }
    if (headerLikeButton) {
      this.article.likeButtonElements.push(headerLikeButton);
    }
    if (footerLikeButton) {
      this.article.likeButtonElements.push(footerLikeButton);
    }

    // ストックボタン
    const leftAreaStockButton = document.querySelector('div.it-Actions_item-stock button');
    const headerStockButton = document.querySelector('div.it-ActionsMobile_stock');
    const footerStockButton = document.querySelector('div.it-Footer_stock div.StockButton button');
    if (leftAreaStockButton) {
      this.article.stockButtonElements.push(leftAreaStockButton);
    }
    if (headerStockButton) {
      this.article.stockButtonElements.push(headerStockButton);
    }
    if (footerStockButton) {
      this.article.stockButtonElements.push(footerStockButton);
    }

    // 記事の更新日時
    this.article.articleUpdateTimeElement = document.querySelector('div.it-Header_time time');

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
    const parentElement = this.getStockButtons()[0].parentElement;
    parentElement.style.display = 'flex';
    parentElement.style.alignItems = 'center';
    parentElement.style.justifyContent = 'center';
    parentElement.style.position = 'relative';
    parentElement.style.marginTop = '40px';

    const div = document.createElement('div');
    div.className = 'qa-stock-counter';
    div.style.fontSize = '16px';
    div.style.fontWeight = '700';
    div.style.color = 'grey';
    div.style.textAlign = 'center';
    div.style.position = 'absolute';
    div.style.top = '-30px';
    div.textContent = count;

    parentElement.insertBefore(div, this.getStockButtons()[0]);

    this.getStockButtons()[0].addEventListener('click', () => {
      if (div.textContent === '100+') return;
      div.textContent = Number(div.textContent) + (this.isStocked() ? -1 : 1);
    });
  }

  isLiked() {
    return this.getLikeButtons()[0].parentElement.className.indexOf('liked') > 0;
  }

  isStocked() {
    return this.getStockButtons()[0].querySelector('i').className.indexOf('fa-folder-open') < 0;
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
    const d = e.getAttribute('datetime');
    e.textContent = moment(d).utcOffset('+09:00').format('YYYY年MM月DD日 HH時mm分');
  }

}
