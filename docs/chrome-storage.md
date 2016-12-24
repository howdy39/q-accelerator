# Chromeストレージの持ち方

本拡張機能では、履歴（histories）と設定（settings）の２種類を持つ。  

- 履歴は閲覧履歴を保存  
- 設定は設定画面で入力した情報を保存


## 履歴（histories）の保存形式

### 形式

```json
{
  "histories": {
    "userId.itemId": {
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

### 形式

```
{
  "settings": {
    "auto-like": 自動良いね（true or false）,
    "auto-stock": 自動ストック（true or false）,
    "copy-code": コードのコピー機能（true or false）,
    "mute-already-read-article": 既読記事を非表示（true or false）,
    "mute-user-article": 特定ユーザーの記事を非表示（true or false）,
    "mute-user-comment": 特定ユーザーのコメントを非表示（true or false）,
    "mute-users": 非表示するユーザーIDの一覧,
    "show-line-number": 行番号を表示（true or false）
  }
}
```


### 例

```
{
  "settings": {
    "auto-like": true,
    "auto-stock": true,
    "copy-code": true,
    "mute-already-read-article": true,
    "mute-user-article": true,
    "mute-user-comment":true,
    "mute-users":["howdy39"],
    "show-line-number":true
  }
}
```
