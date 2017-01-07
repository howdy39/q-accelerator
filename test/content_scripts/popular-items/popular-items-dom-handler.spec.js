import PopularItemsDomHandler from '../../../src/content_scripts/popular-items/popular-items-dom-handler.js';

/**
 * 人気の記事ページ
 * http://qiita.com/popular-items
 */
describe('人気の記事ページ', function () {

  before(function () {
    document.body.innerHTML = require('./popular-items.html');
    this.handler = new PopularItemsDomHandler();
    this.articles = this.handler.getArticles();
  });

  it('人気記事が全部で20件取得できること', function () {
    expect(this.articles.length).to.equal(20);
  });

  it('既読ボタンが追加できること/clickで追加したボタンのイベントが発火すること', function () {
    const callback = sinon.spy(function () {});
    this.handler.addAlreadyReadButton(callback);
    const article = this.articles[0];
    article.baseElement.querySelector('.qa-already-button').click();

    expect(callback.called).to.be.true;

    const href = callback.firstCall.args[0];
    const title = callback.firstCall.args[1];
    expect(href).to.equal('/kunihirotanaka/items/70d43d48757aea79de2d?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items');
    expect(title).to.equal('いまさら聞けないLinuxとメモリの基礎＆vmstatの詳しい使い方');
  });

  describe('１件目の記事', function () {

    before(function () {
      this.article = this.articles[0];
    });

    after(function () {
      delete this.article;
    });

    it('説明が取得できること', function () {
      expect(this.article.description).to.equal('さくらインターネット Advent Calendar最終日は、硬派にLinuxのメモリに関する基礎知識についてみてみたいと思います。最近はサーバーを意識せずプログラミングできるようになり、メモリの…');
    });

    it('hrefが取得できること', function () {
      expect(this.article.href).to.equal('/kunihirotanaka/items/70d43d48757aea79de2d?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items');
    });

    it('itemIdが取得できること', function () {
      expect(this.article.itemId).to.equal('70d43d48757aea79de2d');
    });

    it('いいね数が取得できること', function () {
      expect(this.article.likeCount).to.equal(192);
    });

    it('時間が取得できること', function () {
      expect(this.article.time).to.equal('約23時間前');
    });

    it('タイトルが取得できること', function () {
      expect(this.article.title).to.equal('いまさら聞けないLinuxとメモリの基礎＆vmstatの詳しい使い方');
    });

    it('userIdが取得できること', function () {
      expect(this.article.userId).to.equal('kunihirotanaka');
    });

    it('タグが取得できること', function () {
      expect(this.article.tags).to.deep.equal(['Linux', 'さくらインターネット']);
    });

  });

});
