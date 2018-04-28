# Chromeストレージの持ち方

本拡張機能では、履歴（histories）と設定（settings）の２種類を持つ。  

- 履歴は閲覧履歴を保存  
- 設定は設定画面で入力した情報を保存


## 履歴（histories）の保存形式

### 形式

```json
{
  "histories": {
    "ユーザーID.記事ID": {
      "date": 日時,
      "itemId": 記事ID,
      "itemKind": 記事種別（items or private）,
      "title": 記事のタイトル,
      "userId": ユーザーID
    }
  }
}
```

### 例

```json
{
  "histories": {
    "howdy39.35729490b024ca295d6c": {
      "date": 1482586100899,
      "itemId": "35729490b024ca295d6c",
      "itemKind": "items",
      "title": "図で理解するJavaScriptのプロトタイプチェーン",
      "userId": "howdy39"
    }
  }
}
```

## 設定（settings）の保存形式

※デフォルト設定は[default-settings.json](https://github.com/howdy39/q-accelerator/tree/master/src/common/default-settings.json)に記載

※デフォルトの新規投稿時のテンプレートは[default-body-template.md](https://github.com/howdy39/q-accelerator/tree/master/src/common/default-body-template.md)に記載

### 形式

```json
{
  "settings": {
    "copy-code": コードのコピー機能（true or false）,
    "default-body": 新規投稿時のテンプレート（直接入力）(true or false),
    "default-body-template": テンプレートの文字列,
    "default-body-url": 新規投稿時のテンプレート（ファイルのURLを指定）(true or false),
    "default-body-url-template": テンプレートのURL,
    "off-like-off-stock": 「ストック」を外したとき、自動で「いいね」を外す（true or false）,
    "off-stock-off-like": ストック」したとき、自動で「いいね」する（true or false）,
    "on-like-on-stock": 「いいね」を外したとき、自動で「ストック」を外す（true or false）,
    "on-stock-on-like": いいね」したとき、自動で「ストック」する（true or false）,
    "save-history": 履歴を保存（true or false）,
    "show-article-update-time": 記事の更新時間を表示（true or false),
    "show-line-number": 行番号を表示（true or false）,
    "show-stock-counts": ストック数を表示（true or false）,
    "fix-header": ヘッダー固定（true or false）
  }
}
```


### 例

```json
{
  "settings": {
    "copy-code": true,
    "default-body": true,
    "default-body-template": "# はじめに",
    "default-body-url": false,
    "default-body-url-template": "https://rawgit.com/howdy39/4e7a3290bd4ba9ebbe46f2cd394d0ffd/raw/temlate.md",
    "off-like-off-stock": false,
    "off-stock-off-like": true,
    "on-like-on-stock": true,
    "on-stock-on-like": true,
    "save-history":true,
    "show-article-update-time": true,
    "show-line-number":true,
    "show-stock-counts": true,
    "fix-header": true
  }
}
```
