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
  const [loadingStep, setLoadingStep] =
  useState("Preparing AI...");
  const loadingSteps = [
  "🔍 Researching YouTube...",
  "📈 Finding viral trends...",
  "📝 Writing your script...",
  "🎨 Creating thumbnail strategy...",
  "🚀 Finalizing Creator Kit...",
];
  const [result, setResult] =
  useState<CreatorKit | null>(null);

  const generateCreatorKit = async () => {
    if (!keyword) return;

    try {
      setLoading(true);
      setLoadingStep("🔍 Researching YouTube...");

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

setLoadingStep("✍️ Writing your script...");
await new Promise((r) => setTimeout(r, 500));

setLoadingStep("🎨 Creating thumbnail...");
await new Promise((r) => setTimeout(r, 500));

setLoadingStep("🚀 Finalizing Creator Kit...");
await new Promise((r) => setTimeout(r, 500));

setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
const downloadResult = () => {
  if (!result) return;

  const text = JSON.stringify(result, null, 2);

  const blob = new Blob([text], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${keyword}-creator-kit.json`;

  a.click();

  URL.revokeObjectURL(url);
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
      {loading && (
  <p className="mt-4 text-sm text-emerald-300 animate-pulse">
    {loadingStep}
  </p>
)}

      <button
        onClick={generateCreatorKit}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading
          ? "AI is building your video..."
          : "Generate Everything"}
      </button>
{result && (
  <button
    onClick={downloadResult}
    className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold transition hover:bg-blue-700"
  >
    📥 Download Creator Kit (.json)
  </button>
)}

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