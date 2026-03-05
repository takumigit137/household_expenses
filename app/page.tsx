"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    setLoading(true);

    const result = await Tesseract.recognize(file, "jpn");
    setText(result.data.text);

    setLoading(false);
  };

  const sendToSheets = async () => {
    // 超簡易抽出（後で改善可能）
    const totalMatch = text.match(/¥?\d+/);
    const dateMatch = text.match(/\d{4}\/\d{2}\/\d{2}/);

    await fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify({
        store: "不明",
        date: dateMatch?.[0] ?? "",
        total: totalMatch?.[0] ?? "",
      }),
    });

    alert("送信完了");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>レシートスキャナー</h1>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />

      {loading && <p>OCR中...</p>}

      <pre>{text}</pre>

      {text && (
        <button onClick={sendToSheets}>
          スプレッドシートへ送信
        </button>
      )}
    </div>
  );
}