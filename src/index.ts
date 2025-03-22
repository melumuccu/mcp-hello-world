#!/usr/bin/env node
// MCP: Model Context Protocol (MCP)サーバーの基本的な実装例
// MCP: MCPサーバーは、ツール、リソース、リソーステンプレートを提供できます
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// MCP: StdioServerTransportは標準入出力を介してMCPクライアントと通信します
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

// SAMPLE: シンプルな挨拶を提供するMCPサーバーの実装
class HelloWorldServer {
  private server: Server;

  constructor() {
    // MCP: サーバーの初期化時に名前とバージョンを指定します
    // MCP: capabilitiesでは、このサーバーが提供する機能（ツール、リソース）を定義します
    this.server = new Server(
      {
        name: "hello-world-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {}, // MCP: このサーバーはツールのみを提供します
        },
      }
    );

    this.setupToolHandlers();

    // MCP: エラーハンドリングとサーバーの適切なシャットダウンを設定
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    // MCP: ListToolsRequestSchemaは、利用可能なツールの一覧をクライアントに提供します
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "greet",
          description: "挨拶を返します",
          // MCP: inputSchemaは、ツールが受け付けるパラメータをJSON Schemaで定義します
          inputSchema: {
            type: "object",
            properties: {
              // SAMPLE: 必須パラメータ：挨拶する相手の名前
              name: {
                type: "string",
                description: "挨拶する相手の名前",
              },
              // SAMPLE: オプションパラメータ：挨拶の言語（デフォルトは日本語）
              language: {
                type: "string",
                enum: ["ja", "en"],
                description: "挨拶の言語（ja: 日本語, en: 英語）",
                default: "ja",
              },
            },
            required: ["name"],
          },
        },
      ],
    }));

    // MCP: CallToolRequestSchemaは、ツールの実際の呼び出しを処理します
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      // SAMPLE: ツール名の検証
      if (request.params.name !== "greet") {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      // SAMPLE: パラメータの展開（languageはデフォルト値"ja"を使用）
      const { name, language = "ja" } = request.params.arguments as any;
      let greeting: string;

      // SAMPLE: 言語に応じた挨拶文の生成
      if (language === "ja") {
        greeting = `こんにちは、${name}さん！`;
      } else {
        greeting = `Hello, ${name}!`;
      }

      // MCP: ツールの実行結果は、contentの配列として返されます
      // MCP: contentには、text、html、json、markdownなど様々な型を指定できます
      return {
        content: [
          {
            type: "text",
            text: greeting,
          },
        ],
      };
    });
  }

  async run() {
    // MCP: StdioServerTransportを使用してクライアントとの通信を確立
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Hello World MCP server running on stdio");
  }
}

// SAMPLE: サーバーのインスタンスを作成して起動
const server = new HelloWorldServer();
server.run().catch(console.error);
