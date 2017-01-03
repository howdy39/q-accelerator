import DraftsNewDomHandler from '../../../src/content_scripts/drafts-new/drafts-new-dom-handler.js';

/**
 * 新しい記事
 * http://qiita.com/drafts/new
 */
describe('新しい記事', function () {

  before(function () {
    document.body.innerHTML = require('./drafts-new.html');
    this.handler = new DraftsNewDomHandler();
  });

  after(function () {
    delete this.handler;
  });

  it('タイトルが取得できること', function () {
    expect(this.handler.getEditorTitle()).to.be.equal('');
  });
  it('タイトルが設定できること', function () {
    const title = '新しいタイトル';
    this.handler.setEditorTitle(title);
    expect(this.handler.getEditorTitle()).to.be.equal(title);
  });

  it('タグが取得できること', function () {
    expect(this.handler.getEditorTag()).to.be.equal('');
  });
  it('タグが設定できること', function () {
    const tag = '新しいタグ';
    this.handler.setEditorTag(tag);
    expect(this.handler.getEditorTag()).to.be.equal(tag);
  });

  it('下書き本文が取得できること', function () {
    expect(this.handler.getDraftBody()).to.be.equal('');
  });
  it('下書き本文が設定できること', function () {
    const draftBody = '新しいタグ';
    this.handler.setDraftBody(draftBody);
    expect(this.handler.getDraftBody()).to.be.equal(draftBody);
  });

});
