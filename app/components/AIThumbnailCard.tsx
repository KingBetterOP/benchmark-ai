import Image from "next/image";

import { useState } from "react";
import { AIThumbnail } from "../lib/types";

type Props = {
  thumbnails: AIThumbnail[];
  language: string;
};

export default function AIThumbnailCard({
  thumbnails,
  language,
}: Props) {
    const [generatedImage, setGeneratedImage] =
  useState<string | null>(null);

const [loading, setLoading] =
  useState(false);
  const generateThumbnail = async (prompt: string) => {
  try {
    setLoading(true);

    const res = await fetch(
      "/api/ai/thumbnail-generator",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      }
    );

    const data = await res.json();

    if (data.image?.b64_json) {
      setGeneratedImage(
        `data:image/png;base64,${data.image.b64_json}`
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
const text =
  language === "ko"
    ? {
        title: "AI 썸네일 생성기",
        subtitle: "🎨 AI 썸네일 컨셉",
        style: "스타일",
        composition: "구도",
        emotion: "감정",
        generating: "생성 중...",
        generate: "🎨 썸네일 생성",
        download: "⬇️ 썸네일 다운로드",
      }
    : {
        title: "AI Thumbnail Generator",
        subtitle: "🎨 AI Thumbnail Concepts",
        style: "Style",
        composition: "Composition",
        emotion: "Emotion",
        generating: "Generating...",
        generate: "🎨 Generate Thumbnail",
        download: "⬇️ Download Thumbnail",
      };
  if (!thumbnails.length) return null;

  return (
    <div className="mt-10 rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">
        {text.title}
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        {text.subtitle}
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {thumbnails.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 backdrop-blur-xl p-6"
          >
            <h3 className="text-xl font-bold">
              {item.text}
            </h3>

            <p className="mt-3 text-zinc-400">
              {item.prompt}
            </p>

            <div className="mt-4 space-y-2 text-sm">
  <p>
    <strong>{text.style}:</strong> {item.style}
  </p>

  <p>
    <strong>{text.composition}:</strong> {item.composition}
  </p>

  <p>
    <strong>{text.emotion}:</strong> {item.emotion}
  </p>
</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.colors.map((color, i) => (
                <span
                  key={i}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
            <button
  onClick={() => generateThumbnail(item.prompt)}
  disabled={loading}
  className="mt-6 w-full rounded-xl bg-fuchsia-600 px-4 py-3 font-bold transition hover:bg-fuchsia-500 disabled:opacity-50"
>
  {loading ? text.generating : text.generate}
</button>
{generatedImage && (
  <div className="mt-6">
    <Image
  src={generatedImage}
  alt="Generated Thumbnail"
  width={1024}
  height={576}
  className="w-full rounded-2xl border border-zinc-700"
/>

    <a
      href={generatedImage}
      download="thumbnail.png"
      className="mt-4 block rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold transition hover:bg-emerald-500"
    >
      {text.download}
    </a>
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
}