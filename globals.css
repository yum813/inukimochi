"use client";
import { useEffect } from "react";

/**
 * AdSense 広告ユニットコンポーネント
 *
 * 使い方：
 * 1. layout.js の AdSense script タグのコメントを外す
 * 2. adClient に実際のクライアントID（ca-pub-XXXX）を入れる
 * 3. adSlot に広告ユニットIDを入れる
 *    → AdSenseの管理画面 > 広告 > 広告ユニット で確認できる
 */
export default function AdUnit({ adClient = "ca-pub-YOUR_ID", adSlot = "YOUR_SLOT" }) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.log("AdSense: ", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "16px 0", minHeight: 100 }}>
      {/* AdSense審査通過後にコメントを外す */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}

      {/* 審査中の仮表示（審査通過後は削除） */}
      <div style={{
        background: "#f5f5f5",
        border: "1px dashed #ccc",
        borderRadius: 8,
        padding: "20px",
        fontSize: 12,
        color: "#999"
      }}>
        📢 広告スペース（AdSense審査通過後に表示）
      </div>
    </div>
  );
}
