# MCPサーバーのセットアップと開発用Makefile

.PHONY: init build watch clean

# 初期化：依存関係のインストールとビルドを実行
init:
	@echo "📦 依存関係をインストールしています..."
	pnpm install
	@echo "🔨 サーバーをビルドしています..."
	pnpm run build
	@echo "✨ セットアップが完了しました"

# ビルドのみ実行
build:
	pnpm run build

# 開発用の自動リビルド
watch:
	pnpm run watch

# ビルド成果物のクリーン
clean:
	rm -rf build/
	rm -rf node_modules/
