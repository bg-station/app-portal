// アプリデータを読み込む
let allApps = [];

// DOMが読み込まれたら実行
document.addEventListener("DOMContentLoaded", () => {
  loadApps();
  setupEventListeners();
});

// アプリデータを読み込む
async function loadApps() {
  try {
    const response = await fetch("apps.json");
    allApps = await response.json();
    displayApps(allApps);
  } catch (error) {
    console.error("アプリデータの読み込みに失敗しました:", error);
    // エラー時はサンプルデータを表示
    allApps = getSampleApps();
    displayApps(allApps);
  }
}

// イベントリスナーを設定
function setupEventListeners() {
  // 検索機能
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filterApps);

  // フィルターボタン
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // アクティブ状態を切り替え
      filterButtons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      filterApps();
    });
  });
}

// アプリを表示
function displayApps(apps) {
  const appsGrid = document.getElementById("appsGrid");
  const noResults = document.getElementById("noResults");

  appsGrid.innerHTML = "";

  if (apps.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  apps.forEach((app) => {
    const card = createAppCard(app);
    appsGrid.appendChild(card);
  });
}

// アプリカードを作成
function createAppCard(app) {
  const card = document.createElement("div");
  card.className = "app-card";
  card.dataset.category = app.category;

  const thumbnail = app.thumbnail || createPlaceholderImage(app.title);

  card.innerHTML = `
      <img src="${thumbnail}" alt="${escapeHtml(app.title)}" class="app-thumbnail" onerror="this.src='${createPlaceholderImage(app.title)}'">
        <div class="app-content">
            <h3 class="app-title">${escapeHtml(app.title)}</h3>
            <p class="app-description">${escapeHtml(app.description)}</p>
            <div class="app-meta">
                <span class="app-tag">${getCategoryLabel(app.category)}</span>
                ${app.tags ? app.tags.map((tag) => `<span class="app-tag">${escapeHtml(tag)}</span>`).join("") : ""}
            </div>
            <div class="app-links">
                ${app.siteUrl ? `<a href="${app.siteUrl}" class="app-link primary" target="_blank" rel="noopener">サイトを訪れる</a>` : ""}
                ${app.repoUrl ? `<a href="${app.repoUrl}" class="app-link secondary" target="_blank" rel="noopener">GitHub</a>` : ""}
            </div>
        </div>
    `;

  return card;
}

// アプリをフィルタリング
function filterApps() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const activeFilter =
    document.querySelector(".filter-btn.active").dataset.filter;

  const filteredApps = allApps.filter((app) => {
    // カテゴリフィルター
    const categoryMatch =
      activeFilter === "all" || app.category === activeFilter;

    // 検索フィルター
    const searchMatch =
      !searchTerm ||
      app.title.toLowerCase().includes(searchTerm) ||
      app.description.toLowerCase().includes(searchTerm) ||
      (app.tags &&
        app.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));

    return categoryMatch && searchMatch;
  });

  displayApps(filteredApps);
}

// カテゴリラベルを取得
function getCategoryLabel(category) {
  const labels = {
    web: "Webアプリ",
    tool: "ツール",
    game: "ゲーム",
    other: "その他",
  };
  return labels[category] || "その他";
}

// HTMLエスケープ
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// プレースホルダー画像を作成
function createPlaceholderImage(title) {
  // Data URL形式のSVGプレースホルダーを返す
  const rawTitle = String(title ?? "");
  const normalizedTitle = rawTitle
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) =>
      line
        .replace(/[\t\f\v\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/g, " ")
        .trim(),
    )
    .join("\n")
    .trim();

  const escapeXml = (text) =>
    String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const wrapLines = (text, { maxLines, maxCharsPerLine }) => {
    const chunks = [];

    const pushWrapped = (line) => {
      const chars = Array.from(line);
      for (let i = 0; i < chars.length; i += maxCharsPerLine) {
        chunks.push(chars.slice(i, i + maxCharsPerLine).join(""));
      }
    };

    const lines = String(text).split("\n");
    for (const line of lines) {
      if (line.length === 0) {
        chunks.push("");
      } else {
        pushWrapped(line);
      }
    }

    const sliced = chunks.slice(0, maxLines);
    const overflow = chunks.length > maxLines;
    if (overflow && sliced.length > 0) {
      const last = sliced[sliced.length - 1];
      const lastChars = Array.from(last);
      sliced[sliced.length - 1] =
        (lastChars.length >= 1
          ? lastChars.slice(0, Math.max(0, lastChars.length - 1)).join("")
          : "") + "…";
    }
    return sliced;
  };

  const titleLines = wrapLines(normalizedTitle, {
    maxLines: 2,
    maxCharsPerLine: 10,
  });
  const colors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
  ];
  const colorPair = colors[Math.abs(hashCode(title)) % colors.length];

  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
            <defs>
                <linearGradient id="grad${hashCode(title)}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="300" height="200" fill="url(#grad${hashCode(title)})" />
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="22" fill="white" text-anchor="middle" dominant-baseline="middle">
              ${titleLines
                .map((line, index) => {
                  const dy = index === 0 ? "0" : "1.2em";
                  return `<tspan x="50%" dy="${dy}">${escapeXml(line)}</tspan>`;
                })
                .join("")}
            </text>
        </svg>
    `;

  return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
}

// 文字列のハッシュコードを計算
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// サンプルデータ
function getSampleApps() {
  return [
    {
      title: "サンプルWebアプリ",
      description:
        "これはサンプルのWebアプリケーションです。apps.jsonファイルを編集して実際のアプリ情報を追加してください。",
      category: "web",
      tags: ["React", "TypeScript"],
      siteUrl: "https://example.com/demo",
      repoUrl: "https://github.com/bg-station/sample-app",
    },
    {
      title: "便利ツール",
      description: "日常的なタスクを効率化するための便利なツールです。",
      category: "tool",
      tags: ["JavaScript", "CLI"],
      siteUrl: "https://example.com/tool",
      repoUrl: "https://github.com/bg-station/useful-tool",
    },
    {
      title: "楽しいゲーム",
      description: "ブラウザで遊べる楽しいゲームです。",
      category: "game",
      tags: ["HTML5", "Canvas"],
      siteUrl: "https://example.com/game",
      repoUrl: "https://github.com/bg-station/fun-game",
    },
  ];
}
