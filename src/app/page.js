"use client";
import { useState } from "react";
import AdUnit from "./components/AdUnit";

const DOG_BEHAVIORS = [
  { id: "tail_high",    label: "しっぽを高く振っている",     emoji: "🐕" },
  { id: "tail_low",     label: "しっぽが下がっている",       emoji: "🐕" },
  { id: "tail_between", label: "しっぽを股に挟んでいる",     emoji: "🐕" },
  { id: "ears_forward", label: "耳をピンと立てている",       emoji: "👂" },
  { id: "ears_flat",    label: "耳を後ろに倒している",       emoji: "👂" },
  { id: "yawning",      label: "あくびをしている",           emoji: "😮" },
  { id: "licking_lips", label: "口をペロペロなめている",     emoji: "👅" },
  { id: "rolling",      label: "お腹を見せてゴロン",         emoji: "🐾" },
  { id: "barking",      label: "吠えている",                 emoji: "🔊" },
  { id: "whining",      label: "クーンと鳴いている",         emoji: "🎵" },
  { id: "shaking",      label: "体をブルブル震わせている",   emoji: "😰" },
  { id: "staring",      label: "じっと見つめてくる",         emoji: "👀" },
  { id: "spinning",     label: "くるくる回っている",         emoji: "🌀" },
  { id: "hiding",       label: "物陰に隠れている",           emoji: "🫣" },
  { id: "chewing",      label: "物を噛んでいる・壊す",       emoji: "💥" },
  { id: "leaning",      label: "体を寄りかかってくる",       emoji: "🤗" },
];

const RESULTS = {
  tail_high:    { emotion: "うれしい！テンション最高🎉",         color: "#FFD166", bg: "#FFF9E6", detail: "しっぽが高く速く振れているのは、興奮と喜びのサイン。「遊ぼう！」「会いたかった！」という気持ちです。",                                          advice: "思いっきり遊んであげましょう！この瞬間がワンちゃんにとっての最高の幸せ。",                                        level: 5 },
  tail_low:     { emotion: "不安…ちょっと心配かも",              color: "#A8DADC", bg: "#EBF7F8", detail: "しっぽが低いのは緊張や不安のサイン。慣れない場所や音、知らない人がいるのかもしれません。",                                              advice: "無理に近づかず、穏やかな声で話しかけてあげてください。安心できる場所に誘導してあげると◎",                        level: 2 },
  tail_between: { emotion: "こわい…助けて😢",                    color: "#6C757D", bg: "#F0F1F2", detail: "最大の恐怖・服従のサイン。「怖い」「やめて」という強いSOS信号です。",                                                                  advice: "原因を取り除いてあげてください。無理に触ろうとせず、静かにそばにいてあげることが大切です。",                      level: 1 },
  ears_forward: { emotion: "なんか気になる！集中中🔍",           color: "#06D6A0", bg: "#E6FAF5", detail: "何かに強い興味・関心を持っています。音や動くものを追っているのかも。",                                                                  advice: "何を見ているか一緒に確認してみましょう。その視線の先に何かあるかも？",                                            level: 4 },
  ears_flat:    { emotion: "ごめんなさい…反省中🙏",              color: "#F8961E", bg: "#FEF3E2", detail: "耳が後ろに倒れるのは服従・謝罪のサイン。叱られたとき、または「怒らないで」という気持ちの表れ。",                                          advice: "叱りすぎは逆効果。良い行動をしたときにしっかり褒めてあげる方が効果的です。",                                      level: 2 },
  yawning:      { emotion: "ちょっと落ち着かせて…",              color: "#9B5DE5", bg: "#F3EAF9", detail: "緊張・ストレス・「ちょっと待って」のカーミングシグナル。眠いだけでなく、状況を和らげようとしていることも。",                              advice: "無理強いせず、一度距離をおいてリラックスできる時間をあげましょう。",                                              level: 3 },
  licking_lips: { emotion: "落ち着かない、なんかストレス…",      color: "#F4A261", bg: "#FEF0E4", detail: "リップリッキングはカーミングシグナルのひとつ。不安やストレス、または「もうやめて」のサインです。",                                        advice: "環境の変化や叱りすぎがないか振り返ってみてください。穏やかな環境づくりが大切。",                                  level: 2 },
  rolling:      { emotion: "完全にリラックス！信頼してるよ❤️",   color: "#EF476F", bg: "#FDEBEF", detail: "お腹を見せるのは最大の信頼のサイン。急所を見せるということは「あなたを完全に信頼している」という証。",                                    advice: "優しくお腹を撫でてあげてください。この信頼を大切に！",                                                            level: 5 },
  barking:      { emotion: "なんか伝えたい！注意して！",          color: "#E63946", bg: "#FDECEE", detail: "吠え方によって意味が違います。高く短い吠えは喜び、低く長い吠えは警戒・威嚇のサインです。",                                              advice: "何に反応しているか確認を。要求吠えの場合は、落ち着いてから応じる習慣をつけましょう。",                            level: 3 },
  whining:      { emotion: "かまって〜！さびしいよ😭",           color: "#4CC9F0", bg: "#E8F8FD", detail: "クーンという鳴き声は「構ってほしい」「不安」「痛い・体調不良」のサインのことも。",                                                      advice: "しっかりコミュニケーションをとってあげてください。続く場合は体調チェックも忘れずに。",                            level: 3 },
  shaking:      { emotion: "めちゃくちゃ怖い…😨",               color: "#7209B7", bg: "#F0E5FA", detail: "強い恐怖・不安・寒さ・体調不良のサイン。雷や花火、慣れない場所での反応として多い。",                                                    advice: "安心できる場所に連れていき、優しく声をかけてあげてください。ひどい場合は獣医へ。",                                level: 1 },
  staring:      { emotion: "大好き！ずっと見てたい🥺",           color: "#F72585", bg: "#FEEBF5", detail: "愛情深いまなざしはオキシトシン（愛情ホルモン）が分泌されているサイン。飼い主への深い愛情の表れ。",                                      advice: "優しく見つめ返してあげましょう。アイコンタクトはワンちゃんとの絆を深めます。",                                    level: 5 },
  spinning:     { emotion: "うれしすぎてたまらない！！🌟",        color: "#FFBE0B", bg: "#FFF8E1", detail: "うれしさが爆発してコントロールできない状態。散歩前やご飯前によく見られます。",                                                          advice: "この興奮を一緒に楽しんであげましょう！ただし過剰な場合は落ち着く練習も大切。",                                    level: 5 },
  hiding:       { emotion: "ここにいたい…そっとしといて",        color: "#457B9D", bg: "#E8F1F5", detail: "安全な場所を求めているサイン。体調不良、強いストレス、または単純に静かにしたいだけのことも。",                                          advice: "無理に引っ張り出さないで。ひとりにする時間も大切です。長く続く場合は体調確認を。",                                level: 2 },
  chewing:      { emotion: "暇だよ！もっと遊んで〜",             color: "#E9C46A", bg: "#FDF7E3", detail: "退屈・ストレス・探索本能・歯がかゆい（子犬）のサイン。エネルギーが余っている証拠でもあります。",                                        advice: "運動量を増やすか、噛んでいいおもちゃを用意してあげましょう。コングなどの知育玩具も◎",                            level: 3 },
  leaning:      { emotion: "大好き！一緒にいたいな🐾",           color: "#2EC4B6", bg: "#E5F8F7", detail: "体を寄せてくるのは愛情・信頼・安心のサイン。「あなたのそばが一番落ち着く」という気持ちです。",                                        advice: "そのままそっと撫でてあげてください。この瞬間を大切にしてあげましょう。",                                          level: 5 },
};

function HappinessBar({ level }) {
  const labels = ["😰", "😟", "😐", "😊", "🥰"];
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>幸福度メーター</div>
      <div style={{ display: "flex", gap: 6 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: "50%",
            background: i <= level ? "#FFD166" : "#F0F0F0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, transition: "all 0.4s ease",
            transform: i <= level ? "scale(1.1)" : "scale(1)",
            boxShadow: i <= level ? "0 2px 8px rgba(255,209,102,0.5)" : "none",
          }}>
            {labels[i-1]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [result, setResult] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const handleSelect = (b) => {
    setResult(RESULTS[b.id]);
    setAnimKey(k => k + 1);
  };

  const handleReset = () => setResult(null);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#FFF8F0 0%,#FFF0E6 50%,#FFF8F0 100%)", paddingBottom: 60 }}>

      {/* ヘッダー */}
      <div style={{ background: "linear-gradient(135deg,#FF6B35 0%,#F7C59F 100%)", padding: "32px 24px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.15, transform: "rotate(15deg)" }}>🐾</div>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🐶</div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>いぬきもち</h1>
        <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 500 }}>愛犬の気持ちがわかるアプリ</p>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>

        {/* 広告（ヘッダー直下） */}
        <AdUnit />

        {!result ? (
          <>
            <div style={{ background: "#fff", borderRadius: 20, padding: "20px", margin: "8px 0 16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>🔍</div>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#333" }}>愛犬の行動を選んでね</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "#999" }}>今どんな様子？タップして気持ちを翻訳！</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {DOG_BEHAVIORS.map((b, idx) => (
                <>
                  {/* 8件ごとに広告を挟む */}
                  {idx === 8 && (
                    <div key="ad-mid" style={{ gridColumn: "1 / -1" }}>
                      <AdUnit />
                    </div>
                  )}
                  <button
                    key={b.id}
                    onClick={() => handleSelect(b)}
                    style={{ background: "#fff", border: "2px solid #F5E6D8", borderRadius: 16, padding: "14px 12px", textAlign: "left", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="#FF6B35"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="#F5E6D8"; }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{b.emoji}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#333", lineHeight: 1.4 }}>{b.label}</div>
                  </button>
                </>
              ))}
            </div>
          </>
        ) : (
          <div key={animKey} style={{ animation: "fadeSlideIn 0.5s ease forwards" }}>

            {/* 結果カード */}
            <div style={{ background: result.bg, border: `3px solid ${result.color}`, borderRadius: 24, padding: "28px 24px", margin: "20px 0 16px", boxShadow: `0 8px 32px ${result.color}33` }}>
              <div style={{ fontSize: 60, textAlign: "center", marginBottom: 12, animation: "bounce 1s ease 0.3s 2" }}>🐕</div>
              <div style={{ background: result.color, borderRadius: 50, padding: "8px 20px", display: "inline-block", fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 16, boxShadow: `0 4px 12px ${result.color}66` }}>いぬの気持ち</div>
              <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 900, color: "#222", lineHeight: 1.3 }}>{result.emotion}</h2>
              <HappinessBar level={result.level} />
            </div>

            {/* 広告（結果とアドバイスの間） */}
            <AdUnit />

            {/* 解説カード */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "20px", marginBottom: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: result.color, marginBottom: 8 }}>📖 なぜそう感じているの？</div>
              <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.7 }}>{result.detail}</p>
            </div>

            {/* アドバイスカード */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "20px", marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: result.color, marginBottom: 8 }}>💡 飼い主さんへのアドバイス</div>
              <p style={{ margin: 0, fontSize: 14, color: "#444", lineHeight: 1.7 }}>{result.advice}</p>
            </div>

            {/* SNSシェアボタン */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`うちの子の気持ち…「${result.emotion}」だって😭🐶 #いぬきもち`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, padding: "12px", background: "#1DA1F2", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}
              >
                𝕏 でシェア
              </a>
              <a
                href={`https://line.me/R/share?text=${encodeURIComponent(`うちの子の気持ち…「${result.emotion}」🐶 #いぬきもち`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, padding: "12px", background: "#06C755", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}
              >
                LINE でシェア
              </a>
            </div>

            <button
              onClick={handleReset}
              style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#FF6B35,#F7C59F)", border: "none", borderRadius: 16, fontSize: 16, fontWeight: 800, color: "#fff", cursor: "pointer", boxShadow: "0 6px 20px rgba(255,107,53,0.3)" }}
            >
              🐾 ほかの行動も調べる
            </button>
          </div>
        )}

        {/* フッター広告 */}
        <div style={{ marginTop: 32 }}>
          <AdUnit />
        </div>

        {/* フッター */}
        <div style={{ textAlign: "center", padding: "24px 0 0", fontSize: 11, color: "#bbb" }}>
          © 2025 いぬきもち｜当サービスは一般的な行動解説を提供するものです。体調不良が疑われる場合は獣医師にご相談ください。
        </div>

      </div>
    </div>
  );
}
