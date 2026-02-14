# bg-station App Portal

bg-stationで作成したアプリを集めて公開するHubサイトです。

## 🚀 デモ

GitHub Pagesで公開されています
-  `https://bg-station.github.io/app-portal/`
-  カスタムドメイン設定済：`https://bg-station.com/`

## 📝 アプリの追加方法

1. `apps.json` ファイルを編集します
2. 以下の形式で新しいアプリ情報を追加します:

```json
{
    "title": "アプリ名",
    "description": "アプリの説明文",
    "category": "web | tool | game | other",
    "tags": ["タグ1", "タグ2"],
    "thumbnail": "画像のURL（オプション）",
    "siteUrl": "公開URL（本番稼働しているURL）（オプション）",
    "repoUrl": "GitHubリポジトリのURL（オプション）"
}
```

3. 変更をコミットしてプッシュします

## 🎨 カスタマイズ

### カラースキームの変更

`styles.css` の `:root` セクションで色を変更できます:

```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    /* ... */
}
```

### サイトタイトルの変更

`index.html` の以下の部分を編集します:

```html
<h1 class="logo">bg-station App Portal</h1>
<p class="tagline">bg-stationで作成したアプリを集めたHubサイト</p>
```

## 🛠️ ローカル開発

1. リポジトリをクローン:
```bash
git clone https://github.com/bg-station/app-portal.git
cd app-portal
```

2. ローカルサーバーを起動:
```bash
# Pythonの場合
python -m http.server 8000

# Node.jsのhttp-serverの場合
npx http-server
```

3. ブラウザで `http://localhost:8000` にアクセス

## 📁 ファイル構成

```
app-portal/
├── index.html      # メインHTMLファイル
├── styles.css      # スタイルシート
├── script.js       # JavaScript（アプリの表示・フィルタリング）
├── apps.json       # アプリデータ
├── .nojekyll       # GitHub Pages設定
└── README.md       # このファイル
```

## 🔧 GitHub Pagesの設定

1. GitHubリポジトリの Settings > Pages に移動
2. Source を "Deploy from a branch" に設定
3. Branch を "main" (または "master") の "/" (root) に設定
4. Save をクリック

数分後、サイトが公開されます。

## 📱 機能

- ✅ レスポンシブデザイン（スマホ・タブレット対応）
- ✅ アプリの検索機能
- ✅ カテゴリフィルター
- ✅ タグ表示
- ✅ 自動プレースホルダー画像生成
- ✅ モダンなUIデザイン

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License

## 👥 作成者

bg-station - [GitHub](https://github.com/bg-station)
