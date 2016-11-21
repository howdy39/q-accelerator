import assert from 'power-assert';
import sinon from 'sinon';
import ArticleContent from '../../src/js/article-content';
import Util from '../../src/js/util';

describe('article-content.run()', function() {

  beforeEach(function() {
    this.articleContent = new ArticleContent();

    this.getLocationHrefStub = sinon.stub(this.articleContent, 'getLocationHref');
    this.getTitleStub = sinon.stub(this.articleContent, 'getTitle');
    this.utilsaveHistoryStub = sinon.stub(Util, 'saveHistory');
  });

  afterEach(function () {
    Util.saveHistory.restore();
  });

  it('getLocationHref(), getTitle(), (new Date()).getTime()の返り値が、Util.saveHistory()の引数に渡されていること', function() {
    const URL = 'http://example.com/';
    const TITLE = 'タイトル';
    const clock = sinon.useFakeTimers((new Date()).getTime());

    this.getLocationHrefStub.returns(URL);
    this.getTitleStub.returns(TITLE);

    this.articleContent.run();

    const [url, title, date] = this.utilsaveHistoryStub.firstCall.args;
    assert(url === URL);
    assert(title === TITLE);
    assert(date === clock.now);
  });

});