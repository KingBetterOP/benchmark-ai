"use client";

import { useState } from "react";
import { CreatorKit } from "../lib/creatorKit";

type Props = {
  keyword: string;
};

export default function CreatorKitCard({
  keyword,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
  useState<CreatorKit | null>(null);

  const generateCreatorKit = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/creator-kit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
  if (!result) return;

  await navigator.clipboard.writeText(
    JSON.stringify(result, null, 2)
  );

  alert("Creator Kit copied!");
};

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">

      <h2 className="text-3xl font-extrabold">
        🚀 AI Creator Kit
      </h2>

      <p className="mt-2 text-zinc-400">
        Generate everything you need with one click.
      </p>

      <button
        onClick={generateCreatorKit}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Complete Creator Kit"}
      </button>

      {result && (
  <div className="mt-8 space-y-6">

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        🚀 Viral Titles
      </h3>

      <ul className="space-y-2">
        {result.titles.map((title, index) => (
          <li key={index}>
            {index + 1}. {title}
          </li>
        ))}
      </ul>
    </div>

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        🎣 Hook
      </h3>

      <p>{result.hook}</p>
    </div>

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        📝 Script
      </h3>

      <p className="whitespace-pre-wrap">
        {result.script}
      </p>
    </div>

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        📄 Description
      </h3>

      <p className="whitespace-pre-wrap">
        {result.description}
      </p>
    </div>

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        🏷 Hashtags
      </h3>

      <div className="flex flex-wrap gap-2">
        {result.hashtags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-emerald-600 px-3 py-1 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="rounded-xl bg-zinc-900 p-5">
      <h3 className="mb-3 text-xl font-bold">
        🖼 Thumbnail Prompt
      </h3>

      <p className="whitespace-pre-wrap">
        {result.thumbnailPrompt}
      </p>
    </div>

  </div>
)}

    </div>
  );
}