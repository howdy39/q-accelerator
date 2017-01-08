import ArticleDomHandler from '../../../src/content_scripts/article/article-dom-handler.js';

/**
 * 記事（公開）
 * http://qiita.com/howdy39/items/cdd5b252096f5a2fa438
 */
describe('自身の記事（公開）/コードあり/コメントあり/参照記事あり', function () {

  before(function () {
    document.body.innerHTML = require('./article-mine-codeframes-commented-referenced.html');
    this.handler = new ArticleDomHandler();
  });

  after(function () {
    delete this.handler;
  });

  it('DOMの情報が取得できること', function () {
    expect(this.handler.getTitle()).to.equal('フロントエンドにテストを導入', 'タイトル');
    expect(this.handler.getLikeButtons()).to.have.length(0, '自身の記事はいいねボタンなし');
    expect(this.handler.getStockButtons()).to.have.length(2, '公開記事はストックボタンあり');
    expect(this.handler.getCodeFrames()).to.have.length.above(0, 'コードあり');
    expect(this.handler.getComments()).to.have.length.above(0, 'コメントあり');
    expect(this.handler.getReferences()).to.have.length.above(0, '参照記事あり');
  });

  it('コメント情報が取得できること', function () {
    const comment = this.handler.getComments()[0];
    expect(comment.baseElement).to.not.equal(null, 'baseElement');
    expect(comment.userId).to.equal('techhtml', 'userId');
    expect(comment.commentHeaderElement).to.not.equal(null, 'commentHeaderElement');
    expect(comment.commentContentElement).to.not.equal(null, 'commentContentElement');
  });

  it('参照記事情報が取得できること', function () {
    const reference = this.handler.getReferences()[0];
    expect(reference.href).to.equal('/howdy39/items/b9d704e7f84053924da3#_reference-e4df929c1e8ecdc9ddc4', 'href');
    expect(reference.itemId).to.equal('b9d704e7f84053924da3', 'itemId');
    expect(reference.title).to.equal('step by stepで始めるKarma', 'title');
    expect(reference.userId).to.equal('howdy39', 'userId');
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
  });

  after(function () {
    delete this.handler;
  });

  it('DOMの情報が取得できること', function () {
    expect(this.handler.getTitle()).to.equal('限定共有投稿テスト', 'タイトル');
    expect(this.handler.getLikeButtons()).to.have.length(0, '自身の記事はいいねボタンなし');
    expect(this.handler.getStockButtons()).to.have.length(0, 'プライベート記事はストックボタンなし');
    expect(this.handler.getCodeFrames()).to.have.length.above(0, 'コードあり');
    expect(this.handler.getComments()).to.have.length.above(0, 'コメントあり');
  });

  it('コメントのuserIdが取得できること', function () {
    const comment = this.handler.getComments()[0];
    expect(comment.userId).to.equal('howdy39');
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
  });

  after(function () {
    delete this.handler;
  });

  it('DOMの情報が取得できること', function () {
    expect(this.handler.getLikeButtons()).to.have.length(2, 'いいねボタンが2つ');
    expect(this.handler.getStockButtons()).to.have.length(2, 'ストックボタンが2つ');
    expect(this.handler.getCodeFrames()).to.have.length(0, 'コードなし');
    expect(this.handler.getComments()).to.have.length(0, 'コメントなし');
    expect(this.handler.getReferences()).to.have.length(0, '参照記事なし');
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
  });

  after(function () {
    delete this.handler;
  });

  it('DOMの情報が取得できること', function () {
    expect(this.handler.getLikeButtons()).to.have.length(2, 'いいねボタンが2つ');
    expect(this.handler.getStockButtons()).to.have.length(2, 'ストックボタンが2つ');
    expect(this.handler.isLiked()).to.equal(true, 'いいねされている');
    expect(this.handler.isStocked()).to.equal(true, 'ストックされている');
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
  });

  after(function () {
    delete this.handler;
  });

  it('コードが取得できること', function () {
    expect(this.handler.getCodeFrames()).to.have.length.above(0);
  });

  it('2番目のコードの情報が取得できること', function () {
    const codeFrame = this.handler.getCodeFrames()[1];
    expect(codeFrame.baseElement).to.not.equal(null);
    expect(codeFrame.dataLang).to.equal('javascript');
    expect(codeFrame.fileName).to.equal('javascriptです');
    expect(codeFrame.codeBaseElement).to.not.equal(null);
    expect(codeFrame.codeElement).to.not.equal(null);
    expect(codeFrame.codeText).to.equal(`console.log('1行目');
-console.log('2行目');
+console.log('3行目');`);
  });

});

/**
 * 削除されたコメントの場合、userIdがundefinedであること
 */
describe('削除されたコメント', function () {

  before(function () {
    document.body.innerHTML = require('./article-deleted-comment.html');
    this.handler = new ArticleDomHandler();
  });

  after(function () {
    delete this.handler;
  });

  it('10番目のコメントのuserIdがundefinedであること', function () {
    const comment = this.handler.getComments()[10 - 1];
    expect(comment.userId).to.equal(undefined);
  });

});