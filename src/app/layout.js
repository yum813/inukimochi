import "./globals.css";

export const metadata = {
  title: "いぬきもち - 愛犬の気持ちがわかるアプリ",
  description: "愛犬の行動を選ぶだけで、今どんな気持ちなのかがわかる！飼い主さんへのアドバイスつき。",
  keywords: "犬, 気持ち, 行動, しっぽ, 吠える, ペット, 犬の言葉",
  openGraph: {
    title: "いぬきもち - 愛犬の気持ちがわかるアプリ",
    description: "愛犬の行動を選ぶだけで気持ちがわかる！",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        {/*
          ========================================
          Google AdSense 設定手順：
          1. https://adsense.google.com でアカウント作成
          2. サイトを追加して審査を申請
          3. 審査通過後、下の YOUR_ADSENSE_CLIENT_ID を
             実際のIDに置き換える（例: ca-pub-1234567890123456）
          4. 自動広告をONにすると、Googleが最適な位置に
             自動で広告を配置してくれる
          ========================================
        */}
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
