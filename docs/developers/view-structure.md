# Qiitaの画面構造とExtensionの関連

|画面|URL（例）|manifest設定|
|:---|:---|:---|
|人気の投稿|http://qiita.com/popular-items<br>https://qiita.com/popular-items|左記に同じ|
|トップページ（フィード）| http://qiita.com/<br>https://qiita.com/|左記に同じ|
|トップページ（すべての投稿）|http://qiita.com/items<br>https://qiita.com/items|左記に同じ|
|トップページ（ストック）|http://qiita.com/stock<br>https://qiita.com/stock|左記に同じ|
|トップページ（自分の投稿）|http://qiita.com/stock<br>https://qiita.com/stock|左記に同じ|
|タグ一覧|http://qiita.com/tags<br>https://qiita.com/tags|左記に同じ|
|タグ（トップページ）|http://qiita.com/tags/JavaScript<br>https://qiita.com/tags/JavaScript|`http://qiita.com/tags/*`<br>`https://qiita.com/tags/*`|
|タグ（最近いいねされた投稿）|http://qiita.com/tags/JavaScript/likes<br>https://qiita.com/tags/JavaScript/likes|`http://qiita.com/tags/*`<br>`https://qiita.com/tags/*`|
|タグ（新着投稿）|http://qiita.com/tags/JavaScript/items<br>https://qiita.com/tags/JavaScript/items|`http://qiita.com/tags/*`<br>`https://qiita.com/tags/*`|
|組織一覧|http://qiita.com/organizations<br>https://qiita.com/organizations|-|
|組織（トップページ）|http://qiita.com/organizations/increments<br>https://qiita.com/organizations/increments|-|
|組織（投稿）|http://qiita.com/organizations/increments/activities<br>https://qiita.com/organizations/increments/activities|-|
|組織（メンバー）|http://qiita.com/organizations/increments/members<br>https://qiita.com/organizations/increments/members|-|
|記事（公開）|http://qiita.com/howdy39/items/cdd5b252096f5a2fa438<br>https://qiita.com/howdy39/items/cdd5b252096f5a2fa438|`http://qiita.com/*/items/*`<br>`https://qiita.com/*/items/*`|
|記事（限定共有）|http://qiita.com/howdy39/private/d4c5eb44da359f618497<br>https://qiita.com/howdy39/private/d4c5eb44da359f618497|`http://qiita.com/*/private/*`<br>`http://qiita.com/*/private/*`|
|ユーザープロフィール（トップページ）|http://qiita.com/howdy39<br>https://qiita.com/howdy39|-|
|ユーザープロフィール（フォロワー）|http://qiita.com/howdy39/followers<br>https://qiita.com/howdy39/followers|-|
|ユーザープロフィール（投稿）|http://qiita.com/howdy39/items<br>https://qiita.com/howdy39/items|-|
|ユーザープロフィール（ストック）|http://qiita.com/howdy39/stock<br>https://qiita.com/howdy39/stock|-|
|ユーザープロフィール（いいね）|http://qiita.com/howdy39/like<br>https://qiita.com/howdy39/like|-|
|ユーザープロフィール（限定共有投稿）|http://qiita.com/howdy39/private<br>https://qiita.com/howdy39/private|-|
|ユーザープロフィール（コメント）|http://qiita.com/howdy39/comment<br>https://qiita.com/howdy39/comment|-|
|下書き一覧|http://qiita.com/drafts<br>https://qiita.com/drafts|-|
|新しい記事|https://qiita.com/drafts/new|-|
|設定（アカウント）|https://qiita.com/settings/account|-|
|設定（パスワード）|https://qiita.com/settings/password|-|
|設定（セキュリティ）|https://qiita.com/settings/security|-|
|設定（二段階認証）|https://qiita.com/settings/two_factor_authentication/intro|-|
|設定（アプリケーション）|https://qiita.com/settings/applications|-|
|設定（プロフィール）|https://qiita.com/settings/profile|-|
|設定（メールアドレスと通知）|https://qiita.com/settings/notifications|-|
|設定（Google Analytics）|https://qiita.com/settings/analytics|-|
|アドベントカレンダー|http://qiita.com/advent-calendar<br>https://qiita.com/advent-calendar|-|
|ヘルプ|http://help.qiita.com/ja/categories/qiita/|-|


# チェック項目
画面で手動テストをする際に以下の画面で行う


## 行番号を表示/コードのコピー機能/閲覧履歴の保存

|画面|✓|補足| 
|:---|:---:|:---|
|記事（公開）|✓||
|記事（限定共有）|✓||
|トップページ（フィード）|-|ここを見る人はほとんどいないと思うので未実装|
|トップページ（すべての投稿）|-|ここを見る人はほとんどいないと思うので未実装|
|トップページ（ストック）|-|ここを見る人はほとんどいないと思うので未実装|
|トップページ（自分の投稿）|-|ここを見る人はほとんどいないと思うので未実装|

## 自動いいね/自動ストック
|画面|✓|補足| 
|:---|:---:|:---|
|記事（公開）|✓||

## 人気の投稿から既読記事を非表示
|画面|✓|補足| 
|:---|:---:|:---|
|人気の投稿|✓||
