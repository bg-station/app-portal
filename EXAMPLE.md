# アプリ追加の例

このファイルは、`apps.json`にアプリを追加する際の参考例です。

## 基本的な追加例

```json
{
    "title": "マイアプリ",
    "description": "このアプリは○○を行うためのツールです。",
    "category": "tool",
    "tags": ["JavaScript", "Node.js"],
    "thumbnail": "",
    "demoUrl": "https://example.com/my-app",
    "repoUrl": "https://github.com/bg-station/my-app"
}
```

## フィールドの説明

| フィールド | 必須 | 説明 | 例 |
|-----------|------|------|-----|
| `title` | ✅ | アプリの名前 | `"Task Manager"` |
| `description` | ✅ | アプリの説明文 | `"タスクを管理するためのシンプルなアプリ"` |
| `category` | ✅ | カテゴリ (`web`, `tool`, `game`, `other`のいずれか) | `"tool"` |
| `tags` | ❌ | 技術タグの配列 | `["React", "TypeScript", "Firebase"]` |
| `thumbnail` | ❌ | サムネイル画像のURL | `"https://example.com/thumbnail.png"` |
| `demoUrl` | ❌ | デモサイトのURL | `"https://my-app.github.io"` |
| `repoUrl` | ❌ | GitHubリポジトリのURL | `"https://github.com/user/repo"` |

## カテゴリの選択

- **`web`**: Webアプリケーション（ブラウザで動作するアプリ）
- **`tool`**: 開発ツール、CLIツール、ユーティリティなど
- **`game`**: ゲーム（ブラウザゲーム、デスクトップゲームなど）
- **`other`**: その他のアプリ

## 複数アプリの追加例

```json
[
    {
        "title": "Todo App",
        "description": "シンプルなタスク管理アプリ",
        "category": "web",
        "tags": ["React", "LocalStorage"],
        "thumbnail": "https://example.com/todo-thumbnail.png",
        "demoUrl": "https://example.com/todo-app",
        "repoUrl": "https://github.com/bg-station/todo-app"
    },
    {
        "title": "Code Formatter",
        "description": "コードを自動整形するCLIツール",
        "category": "tool",
        "tags": ["Python", "CLI"],
        "thumbnail": "",
        "demoUrl": "",
        "repoUrl": "https://github.com/bg-station/code-formatter"
    },
    {
        "title": "Puzzle Game",
        "description": "ブラウザで遊べるパズルゲーム",
        "category": "game",
        "tags": ["JavaScript", "Canvas", "HTML5"],
        "thumbnail": "https://example.com/puzzle-thumbnail.png",
        "demoUrl": "https://example.com/puzzle-game",
        "repoUrl": "https://github.com/bg-station/puzzle-game"
    }
]
```

## 画像について

### サムネイル画像の準備

1. **推奨サイズ**: 横300px × 縦200px（アスペクト比 3:2）
2. **フォーマット**: PNG、JPEG、WebP
3. **ホスティング**: 
   - GitHub（リポジトリ内の画像）
   - Imgur
   - Cloudinary
   - その他の画像ホスティングサービス

### 画像がない場合

`thumbnail`フィールドを空文字列（`""`）にすると、自動的にグラデーション付きのプレースホルダー画像が生成されます。

## JSONの書き方の注意点

1. **配列の最後の要素**にカンマ（`,`）を付けない
2. **文字列**は必ずダブルクォート（`"`）で囲む
3. **改行やタブ**は使用可能（可読性のため推奨）
4. **URLは完全なURL**を記載（`https://`から始める）

### 間違った例 ❌

```json
[
    {
        "title": "App 1",
        "category": "web",
    },  // 最後のカンマが不要
]  // 配列の最後のカンマも不要
```

### 正しい例 ✅

```json
[
    {
        "title": "App 1",
        "category": "web"
    }
]
```

## apps.jsonの編集手順

1. `apps.json`ファイルを開く
2. 既存のアプリデータを参考に、新しいアプリ情報を追加
3. JSONの構文が正しいか確認（VSCodeなどのエディタを使用推奨）
4. 変更を保存
5. GitHubにコミット＆プッシュ
6. GitHub Pagesが自動的に更新される（通常数分以内）

## JSONバリデーション

JSONの構文が正しいかチェックするには：

- [JSONLint](https://jsonlint.com/) - オンラインJSONバリデーター
- VSCode - JSON形式の自動検証機能
- コマンドライン: `python -m json.tool apps.json`

## 参考リンク

- [JSON形式について](https://www.json.org/json-ja.html)
- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
