import PopularItemsDomHandler from '../../../src/content_scripts/popular-items/popular-items-dom-handler.js';


describe('人気の記事ページ', function () {

  before(function () {
    document.body.innerHTML = require('./popular-items.html');
    const handler = new PopularItemsDomHandler();
    this.articleObjects = handler.getArticleObjects();
  });

  it('人気記事が全部で20件取得できること', function () {
    expect(this.articleObjects.length).to.equal(20);
  });

  it('１件目の記事情報が取得できること', function () {
    const expectedDescription = 'さくらインターネット Advent Calendar最終日は、硬派にLinuxのメモリに関する基礎知識についてみてみたいと思います。最近はサーバーを意識せずプログラミングできるようになり、メモリの…';
    const expectedHref = '/kunihirotanaka/items/70d43d48757aea79de2d?utm_campaign=popular_items&utm_medium=referral&utm_source=popular_items';
    const expectedItemId = '70d43d48757aea79de2d';
    const expectedlikeCount = '192';
    const expectedTime = '約23時間前';
    const expectedTitle = 'いまさら聞けないLinuxとメモリの基礎＆vmstatの詳しい使い方';
    const expectedUserId = 'kunihirotanaka';
    const expectedTags = ['Linux', 'さくらインターネット'];

    const firstArticle = this.articleObjects[0];

    expect(firstArticle.description).to.equal(expectedDescription);
    expect(firstArticle.href).to.equal(expectedHref);
    expect(firstArticle.itemId).to.equal(expectedItemId);
    expect(firstArticle.likeCount).to.equal(expectedlikeCount);
    expect(firstArticle.time).to.equal(expectedTime);
    expect(firstArticle.title).to.equal(expectedTitle);
    expect(firstArticle.userId).to.equal(expectedUserId);
    expect(firstArticle.tags).to.deep.equal(expectedTags);
  });

});
