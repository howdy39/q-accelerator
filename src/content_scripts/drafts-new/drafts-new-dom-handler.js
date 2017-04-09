
export default class DraftsNewDomHandler {

  constructor() {
    this.form = {
      editorTitle: {
        baseElement: null,
        element: null,
      },
      editorTag: {
        baseElement: null,
        element: null,
      },
      draftBody: {
        baseElement: null,
        element: null,
      },
    };

    // タイトル
    this.form.editorTitle.baseElement = document.querySelector('.editor_content .editorTitle');
    this.form.editorTitle.element     = document.querySelector('.editor_content .editorTitle input');

    // タグ
    this.form.editorTag.baseElement = document.querySelector('.editor_content .editorTag');
    this.form.editorTag.element     = document.querySelector('.editor_content .editorTag input');

    // 下書き本文
    this.form.draftBody.baseElement = document.querySelector('.editor_content .editorMarkdown_textareaWrapper');
    this.form.draftBody.element     = document.querySelector('.editor_content .editorMarkdown_textareaWrapper textarea');
  }

  getEditorTitle() {
    return this.form.editorTitle.element.value;
  }
  setEditorTitle(value) {
    return this.form.editorTitle.element.value = value;
  }

  getEditorTag() {
    return this.form.editorTag.element.value;
  }
  setEditorTag(value) {
    return this.form.editorTag.element.value = value;
  }

  getDraftBody() {
    return this.form.draftBody.element.value;
  }
  setDraftBody(value) {
    return this.form.draftBody.element.value = value;
  }

}
