import ArticleListStreamDomHandler from '../../../src/content_scripts/article-list-stream/article-list-stream-dom-handler.js';

/**
 * トップページ（フィード）
 */
describe('トップページ（フィード）', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-stream-feed.html');
    this.handler = new ArticleListStreamDomHandler();
    this.articles = this.handler.getArticles();
  });

  after(function () {
    delete this.handler;
    delete this.articles;
  });

  it('記事が全部で20件取得できること', function () {
    // 記事の中に`item-box track hidden`というのがあるがこれは同じ記事が複数表示されないようにするために設定されている
    // 取得しているのは20件固定だが、20件表示されるとは限らない
    expect(this.articles.length).to.equal(20);
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('http://qiita.com/Kurowasi/items/b0123d20e052cb0bff44');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('b0123d20e052cb0bff44');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(0);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('CompositeパターンをJavaScriptとJavaのコードを比較して理解する');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('Kurowasi');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['Java', 'JavaScript', 'デザインパターン', 'GoF', 'Composite']);
    });

  });

});

// /**
//  * トップページ（すべての投稿）
//  */
describe('トップページ（すべての投稿）', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-stream-items.html');
    this.handler = new ArticleListStreamDomHandler();
    this.articles = this.handler.getArticles();
  });

  after(function () {
    delete this.handler;
    delete this.articles;
  });

  it('記事が全部で20件取得できること', function () {
    expect(this.articles.length).to.equal(20);
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('http://qiita.com/peroon/items/6762c86674bf024d996c');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('6762c86674bf024d996c');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(0);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('顔画像データセット Labeled Faces in the Wild の aligned with deep funneling とは');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('peroon');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['顔認識']);
    });

  });

});

/**
 * トップページ（ストック）
 */
describe('トップページ（ストック）', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-stream-stock.html');
    this.handler = new ArticleListStreamDomHandler();
    this.articles = this.handler.getArticles();
  });

  after(function () {
    delete this.handler;
    delete this.articles;
  });

  it('記事が全部で20件取得できること', function () {
    expect(this.articles.length).to.equal(20);
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('http://qiita.com/janus_wel/items/da1fcfc8d50969135b31');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('da1fcfc8d50969135b31');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(122);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('JavaScript でも型チェックと契約による設計で安定した開発をする');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('janus_wel');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['JavaScript', 'Design', 'flow', 'babel', 'assert']);
    });

  });

});

/**
 * トップページ（自分の投稿）
 */
describe('トップページ（自分の投稿）', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-stream-mine.html');
    this.handler = new ArticleListStreamDomHandler();
    this.articles = this.handler.getArticles();
  });

  after(function () {
    delete this.handler;
    delete this.articles;
  });

  it('記事が全部で20件取得できること', function () {
    expect(this.articles.length).to.equal(20);
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('http://qiita.com/howdy39/private/d4c5eb44da359f618497');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('d4c5eb44da359f618497');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(0);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('限定共有投稿テスト');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('howdy39');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['ダミー']);
    });

  });

});