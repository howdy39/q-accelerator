import ArticleDomHandler from '../../../src/content_scripts/article-list-tags/article-list-tags-dom-handler.js';

/**
 * Tagのトップページ
 * http://qiita.com/tags/xxxxx
 */
describe('Tagのトップページ', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-tags.html');
    this.handler = new ArticleDomHandler();
    this.articles = this.handler.getArticles();
  });

  after(function () {
    delete this.handler;
    delete this.articles;
  });

  it('記事が全部で15件取得できること（最近いいねされた投稿10件・新着投稿5件）', function () {
    expect(this.articles.length).to.equal(15);
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('/gonta616/items/050a72aadcce44ec9774');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('050a72aadcce44ec9774');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(42);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('Web開発者、アプリ開発者に捧ぐReactの提唱する"learn once, write anywhere"はどこまで本当なのか？');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('gonta616');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['JavaScript', 'Android', 'iOS', 'reactjs', 'reactnative']);
    });

  });

});

/**
 * Tagの一覧ページ
 * http://qiita.com/tags/xxxxx/items
 */
describe('Tagの一覧ページ', function () {

  before(function () {
    document.body.innerHTML = require('./article-list-tags-items.html');
    this.handler = new ArticleDomHandler();
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
      expect(this.article.href).to.equal('/boomin/items/d4b4e1b5258a63fd6dd2');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('d4b4e1b5258a63fd6dd2');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(0);
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('jsのグラフライブラリ52選 その2');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('boomin');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['JavaScript', 'd3.js', 'GoogleChartAPI', 'graph', 'c3.js']);
    });

  });

});