# 🐶 いぬきもち - 公開・運用ガイド

## ファイル構成

```
inukimochi/
├── package.json
├── next.config.js
└── src/app/
    ├── layout.js          ← AdSenseのscriptタグを入れる場所
    ├── page.js            ← メインページ
    ├── globals.css
    └── components/
        └── AdUnit.js      ← 広告コンポーネント（IDを書き換えるだけ）
```

---

## ① Vercelで無料公開する手順（5分）

### 1. GitHubにアップロード
1. https://github.com にログイン（アカウントなければ無料作成）
2. 「New repository」→ 名前を `inukimochi` にして作成
3. このフォルダの中身をアップロード

### 2. Vercelと連携
1. https://vercel.com にGitHubアカウントでログイン
2. 「Add New Project」→ GitHubの `inukimochi` を選択
3. 設定はそのまま「Deploy」ボタンを押す
4. 数分で **https://inukimochi.vercel.app** のようなURLが発行される！

> ✅ 完全無料・SSL（https）自動対応・更新も自動

---

## ② Google AdSenseの設定手順

### Step 1: アカウント作成（初回のみ）
1. https://adsense.google.com にアクセス
2. Googleアカウントでログイン
3. サイトURLを入力（Vercelで発行されたURL）
4. 審査申請 → **1〜2週間で審査結果が届く**

### Step 2: 審査通過後の設定
1. AdSenseのダッシュボードで **クライアントID** を確認
   - 例: `ca-pub-1234567890123456`

2. `src/app/layout.js` を開いて、コメントを外す：
```js
// コメントを外す（/* */ を削除）
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-あなたのID"
  crossOrigin="anonymous"
/>
```

3. 「広告ユニット」を作成して **スロットID** を取得
   - AdSense管理画面 > 広告 > 広告ユニット > ディスプレイ広告

4. `src/app/components/AdUnit.js` を開いてコメントを外す：
```js
// adClient と adSlot を自分のIDに書き換えてコメントを外す
<ins
  className="adsbygoogle"
  ...
  data-ad-client="ca-pub-あなたのID"
  data-ad-slot="あなたのスロットID"
  ...
/>
```

5. GitHubにプッシュ → Vercelが自動でデプロイ完了！

---

## ③ 独自ドメインを取得したい場合（任意）

1. https://www.onamae.com または https://www.value-domain.com でドメイン取得
   - 例: `inukimochi.com`（年間1,000〜2,000円）
2. Vercelのダッシュボード > Settings > Domains で追加するだけ

---

## ④ SNS集客のコツ

### Instagramで投稿するネタ例
- 「うちの子がしっぽを股に挟んでいた → 怖かったのか！」
- 「お腹見せてくれた → 信頼されてた😭」

### TikTok向け動画アイデア
- 愛犬の行動をアプリで調べる動画
- 「知らなかった犬のサイン5選」

### バズるハッシュタグ
`#いぬきもち #犬のいる生活 #犬の気持ち #犬好きな人と繋がりたい`

---

## 収益の目安

| 月間PV | 広告収益/月 |
|--------|------------|
| 1万PV  | 500〜2,000円 |
| 10万PV | 5,000〜2万円 |
| 100万PV| 5〜20万円 |

---

## 困ったときは

- Vercelのエラー → https://vercel.com/docs
- AdSenseの審査 → https://support.google.com/adsense
- このアプリの改修はいつでもClaudeに相談してください！
