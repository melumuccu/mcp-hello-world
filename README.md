# hello-world MCP サーバー

シンプルな挨拶機能を提供する Model Context Protocol サーバー

この TypeScript ベースの MCP サーバーは、基本的な挨拶システムを実装しています。以下の MCP の基本概念を実装しています：

- 日本語と英語での挨拶機能の提供
- ユーザー名を受け取り、カスタマイズされた挨拶を返す機能

## 機能

### ツール

- `greet` - 挨拶を生成するツール
  - 必須パラメータ: `name`（挨拶する相手の名前）
  - オプションパラメータ: `language`（言語選択、"ja"または"en"）
  - デフォルトでは日本語で挨拶を返します

## 開発方法

### Makefile を使用する場合

初期セットアップ（依存関係のインストール & ビルド）:

```bash
make (init)
```

ビルドのみ実行:

```bash
make build
```

開発時の自動リビルド:

```bash
make watch
```

クリーンアップ:

```bash
make clean
```

### 直接コマンドを使用する場合

依存関係のインストール:

```bash
pnpm install
```

サーバーのビルド:

```bash
pnpm run build
```

開発時の自動リビルド:

```bash
pnpm run watch
```

## インストール方法

Claude Desktop で使用するには、以下の設定を追加してください：

MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hello-world": {
      "command": "/path/to/hello-world/build/index.js"
    }
  }
}
```

### デバッグ

MCP サーバーは stdio を介して通信するため、デバッグが難しい場合があります。[MCP Inspector](https://github.com/modelcontextprotocol/inspector)の使用をお勧めします：

```bash
pnpm run inspector
```

Inspector は、ブラウザでデバッグツールにアクセスするための URL を提供します。

### 使用例

```typescript
// 日本語での挨拶
<use_mcp_tool>
<server_name>hello-world</server_name>
<tool_name>greet</tool_name>
<arguments>
{
  "name": "山田",
  "language": "ja"
}
</arguments>
</use_mcp_tool>

// 結果: こんにちは、山田さん！

// 英語での挨拶
<use_mcp_tool>
<server_name>hello-world</server_name>
<tool_name>greet</tool_name>
<arguments>
{
  "name": "John",
  "language": "en"
}
</arguments>
</use_mcp_tool>

// 結果: Hello, John!
```
