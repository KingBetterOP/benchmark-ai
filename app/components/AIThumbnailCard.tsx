import { useState } from "react";
import { AIThumbnail } from "../lib/types";

type Props = {
  thumbnails: AIThumbnail[];
};

export default function AIThumbnailCard({
  thumbnails,
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
  if (!thumbnails.length) return null;

  return (
    <div className="mt-10 rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-400">
        AI Thumbnail Generator
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        🎨 Thumbnail Concepts
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {thumbnails.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-zinc-900 p-6"
          >
            <h3 className="text-xl font-bold">
              {item.text}
            </h3>

            <p className="mt-3 text-zinc-400">
              {item.prompt}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Style:</strong> {item.style}</p>
              <p><strong>Composition:</strong> {item.composition}</p>
              <p><strong>Emotion:</strong> {item.emotion}</p>
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
  {loading ? "Generating..." : "🎨 Generate Thumbnail"}
</button>
{generatedImage && (
  <div className="mt-6">
    <img
      src={generatedImage}
      alt="Generated Thumbnail"
      className="w-full rounded-2xl border border-zinc-700"
    />

    <a
      href={generatedImage}
      download="thumbnail.png"
      className="mt-4 block rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold transition hover:bg-emerald-500"
    >
      ⬇️ Download Thumbnail
    </a>
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
}