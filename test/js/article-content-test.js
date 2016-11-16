import assert from 'power-assert';
import sinon from 'sinon';
import ArticleContent from '../../src/js/article-content';

describe('article-content.run()', function() {
  beforeEach(function() {
    this.articleContent = new ArticleContent();
    this.mock = sinon.mock(this.articleContent);

    this.getLocationHrefStub = sinon.stub(this.articleContent, 'getLocationHref');
  });

  it('getLocationHref()の返り値がsaveUrl()の引数に渡されていること', function() {
    const URL = 'http://example.com/';

    this.getLocationHrefStub.returns(URL);
    this.mock.expects('saveUrl').withArgs(URL);

    this.articleContent.run();

    assert(this.mock.verify());
  });
});