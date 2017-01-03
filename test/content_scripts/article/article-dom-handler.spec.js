import ArticleDomHandler from '../../../src/content_scripts/article/article-dom-handler.js';

/**
 * 記事（公開）
 * http://qiita.com/howdy39/items/cdd5b252096f5a2fa438
 */
describe('自身の記事（公開）/コードあり/コメントあり/参照記事あり', function () {

  before(function () {
    document.body.innerHTML = require('./article-mine-codeframes-commented-referenced.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('URLが取得できること', function () {
    // window.location.hrefを使っているため実施不可
  });

  it('タイトルが取得できること', function () {
    expect(this.article.title).to.equal('フロントエンドにテストを導入');
  });

  // 自身の記事はいいね不可
  it('いいねボタンが取得できないこと', function () {
    expect(this.article.likeButtons.length).to.equal(0);
  });

  it('ストックボタンが取得できること', function () {
    expect(this.article.stockButtons.length).to.equal(2);
  });

  it('コードが取得できること', function () {
    expect(this.article.codeFrames.length).to.not.equal(0);
  });

  it('コメントが取得できること', function () {
    expect(this.article.comments.length).to.not.equal(0);
  });

  describe('１件目のコメント', function () {

    before(function () {
      this.comment = this.article.comments[0];
    });

    after(function () {
      delete this.comment;
    });

    it('コメント情報が取得できること', function () {
      expect(this.comment.baseElement).to.be.not.equal(undefined, 'baseElement');
      expect(this.comment.userId).to.equal('techhtml', 'userId');
      expect(this.comment.commentHeaderElement).to.be.not.equal(undefined, 'commentHeaderElement');
      expect(this.comment.commentContentElement).to.be.not.equal(undefined, 'commentContentElement');
    });

  });

  it('参照記事が取得できること', function () {
    expect(this.article.references).to.not.equal(0);
  });

  describe('１件目の参照記事', function () {

    before(function () {
      this.reference = this.article.references[0];
    });

    after(function () {
      delete this.reference;
    });

    it('hrefが取得できること', function () {
      expect(this.reference.href).to.equal('/howdy39/items/b9d704e7f84053924da3#_reference-e4df929c1e8ecdc9ddc4');
    });

    it('itemIdが取得できること', function () {
      expect(this.reference.itemId).to.equal('b9d704e7f84053924da3');
    });

    it('titleが取得できること', function () {
      expect(this.reference.title).to.equal('step by stepで始めるKarma');
    });

    it('userIdが取得できること', function () {
      expect(this.reference.userId).to.equal('howdy39');
    });

  });

});

/**
 * 記事（限定共有）
 * http://qiita.com/howdy39/private/d4c5eb44da359f618497
 */
describe('自身の記事（限定共有）', function () {

  before(function () {
    document.body.innerHTML = require('./article-mine-private.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('URLが取得できること', function () {
    // window.location.hrefを使っているため実施不可
  });

  it('タイトルが取得できること', function () {
    expect(this.article.title).to.equal('限定共有投稿テスト');
  });

  // 自身の記事はいいね不可
  it('いいねボタンが取得できないこと', function () {
    expect(this.article.likeButtons.length).to.equal(0);
  });

  it('ストックボタンが取得できないこと', function () {
    expect(this.article.stockButtons.length).to.equal(0);
  });

  it('コードが取得できること', function () {
    expect(this.article.codeFrames.length).to.not.equal(0);
  });

  it('コメントが取得できること', function () {
    expect(this.article.comments.length).to.not.equal(0);
  });

  describe('１件目のコメント', function () {

    before(function () {
      this.comment = this.article.comments[0];
    });

    after(function () {
      delete this.comment;
    });

    it('userIdが取得できること', function () {
      expect(this.comment.userId).to.equal('howdy39');
    });

  });

});

/**
 * 記事（公開）
 * http://qiita.com/locol23/items/daaaf21ff2119d5bfeb2
 */
describe('他者の記事/コードなし/コメントなし/参照記事なし', function () {

  before(function () {
    document.body.innerHTML = require('./article-others-no-codeframes-not-commented-not-referenced.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('いいねボタンが取得できること', function () {
    expect(this.article.likeButtons.length).to.equal(2);
  });

  it('ストックボタンが取得できること', function () {
    expect(this.article.stockButtons.length).to.equal(2);
  });

  it('コードが取得できないこと', function () {
    expect(this.article.codeFrames.length).to.equal(0);
  });

  it('コメントが取得できないこと', function () {
    expect(this.article.comments.length).to.equal(0);
  });

  it('参照記事が取得できないこと', function () {
    expect(this.article.references.length).to.equal(0);
  });

});

/**
 * 記事（公開）
 * http://qiita.com/locol23/items/daaaf21ff2119d5bfeb2
 */
describe('他者の記事/いいね済/ストック済', function () {

  before(function () {
    document.body.innerHTML = require('./article-others-liked-stocked.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('いいねボタンが取得できること', function () {
    expect(this.article.likeButtons.length).to.equal(2);
  });

  it('ストックボタンが取得できること', function () {
    expect(this.article.stockButtons.length).to.equal(2);
  });

  it('いいねされていること', function () {
    expect(this.handler.isLiked()).to.be.true;
  });

  it('ストックされていること', function () {
    expect(this.handler.isStocked()).to.be.true;
  });

});

/**
 * codeFrame
 * 2番目のコードが javascript:javascriptです
 */
describe('codeFrame', function () {

  before(function () {
    document.body.innerHTML = require('./article-codeframe.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('コードが取得できること', function () {
    expect(this.article.codeFrames.length).to.not.equal(0);
  });

  it('2番目のコードの情報が取得できること', function () {
    const codeFrame = this.article.codeFrames[1];
    expect(codeFrame.baseElement).to.be.not.null;
    expect(codeFrame.dataLang).to.equal('javascript');
    expect(codeFrame.fileName).to.equal('javascriptです');
    expect(codeFrame.codeBaseElement).to.be.not.null;
    expect(codeFrame.codeElement).to.be.not.null;
    expect(codeFrame.codeText).to.equal(`console.log('1行目');
-console.log('2行目');
+console.log('3行目');
`);
  });

});

/**
 * 削除されたコメントの場合、userIdがundefinedであること
 */
describe('削除されたコメント', function () {

  before(function () {
    document.body.innerHTML = require('./article-deleted-comment.html');
    this.handler = new ArticleDomHandler();
    this.article = this.handler.getArticle();
  });

  after(function () {
    delete this.handler;
    delete this.article;
  });

  it('10番目のコメントのuserIdがundefinedであること', function () {
    const comment = this.article.comments[10 - 1];
    expect(comment.userId).to.be.undefined;
  });

});