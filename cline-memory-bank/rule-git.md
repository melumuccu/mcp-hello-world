# Git

## カスタム指示

"cmt" or "commit"

- この入力がされた場合、{{commit message format}}に従って日本語で git にコミットする。
- カスタム指示に続くテキストをそのままコミットメッセージの先頭に使用する。
  - ex. `commit refa: /iju` => `refa: /iju {{以降はcommit message formatに従う}}`

"tmp-cmt" or "tmp-commit"

- この入力がされた場合、{{commit message format}}に従って日本語で git にコミットする。
- {{commit type}}には`tmp`を使用する。
- コミットメッセージにはどのようなエラーが発生しているかを記述する。

## commit

### コマンド例

`git add . && git commit -m "xxxx: ..."`

### commit message format

```
{{commit type}}: 概要

詳細
```

### commit type

- feature: 新機能、処理変更
- fix: バグ修正
- docs: ドキュメントファイルやコメントのみの修正
- refactor: 仕様変更を伴わないリファクタリング
- perf: パフォーマンス最適化の変更
- delete: ファイル削除
- style: CSS スタイルの修正
- chore: 上記のいずれにも当てはまらない雑多な作業
- tmp: エラーが発生している状態でログを残すためのコミット

### commit type のフォーマット

1. 基本ルール

- commit type は必ず 4 文字にする

2. 変換規則

- 5 文字以上の場合：先頭 4 文字のみ使用
  - 例：feature => feat
- 4 文字の場合：そのまま使用
  - 例：docs => docs
- 4 文字未満の場合：末尾に`_`を付けて 4 文字にする
  - 例：fix（3 文字）=> fix\_

3. 具体例
   | 元の型 | 文字数 | 変換後 | 理由 |
   |-------|--------|--------|------|
   | feature | 7 文字 | feat | 先頭 4 文字を使用 |
   | docs | 4 文字 | docs | そのまま使用 |
   | fix | 3 文字 | fix* | `*`を付けて 4 文字に |

### コミットメッセージ

- 改行は改行として認識されるようにする（"\n"とならないように注意）
- 概要・詳細共通
  - 「なぜ・何を・どのように」を明確に記述する
  - 特に概要（1 行目）には「何をしたか」を曖昧さを残さず明示的に記載する
    - 良い例：「ヘッダーリンクに children プロパティを追加」「API のレスポンス型を修正」
    - 悪い例：「ナビゲーションを改善」「API の修正」
- 詳細
  - Markdown の箇条書きや番号付きリストを適宜使用する。それ以外の装飾は禁止

## diff

- 現在の git diff を表示するには以下のコマンドを使用する
  - `$ git diff -- ./{path}`
