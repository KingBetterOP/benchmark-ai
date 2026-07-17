"use client";

import { useState } from "react";

type Props = {
  prompt: string;
};

export default function ThumbnailGenerator({
  prompt,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [customPrompt, setCustomPrompt] = useState(prompt);

  const generateThumbnail = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  prompt: customPrompt,
  generateImage: true,
}),
      });

      const data = await response.json();

      if (data.image) {
        setImageUrl(data.image);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="mt-8 rounded-xl border border-pink-500 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">
        🖼️ AI 썸네일 생성
      </h2>

       <textarea
  value={customPrompt}
  onChange={(e) => setCustomPrompt(e.target.value)}
  className="mt-4 h-40 w-full rounded-lg border border-gray-700 bg-black p-4 text-white"
  placeholder="썸네일 프롬프트를 수정하세요..."
/>

      <button
        onClick={generateThumbnail}
        className="mt-6 rounded-lg bg-pink-600 px-5 py-3 hover:bg-pink-700"
      >
        🎨 썸네일 생성하기
      </button>

      {loading && (
  <div className="mt-6 flex flex-col items-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>

    <p className="mt-4 text-gray-300">
      🎨 AI가 썸네일을 생성하는 중입니다...
    </p>
  </div>
)}

      {imageUrl && (
  <div className="mt-6">
    <img
      src={`data:image/png;base64,${imageUrl}`}
      alt="AI Thumbnail"
      className="rounded-xl"
    />

    <a
      href={`data:image/png;base64,${imageUrl}`}
      download="thumbnail.png"
      className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 hover:bg-green-700"
    >
      ⬇️ 다운로드
    </a>
    <button
  onClick={generateThumbnail}
  className="ml-3 mt-4 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
>
  🔄 다시 생성
</button>
  </div>
)}
    </div>
  );
}