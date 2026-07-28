"use client";

import { useState } from "react";

type Props = {
  keyword: string;
};

export default function AIThumbnailPromptCard({
  keyword,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePrompt = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/thumbnail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setPrompt(data.prompt);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    alert("Thumbnail prompt copied!");
  };

  return (
    <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6">

      <h2 className="text-2xl font-bold">
        🖼 AI Thumbnail Prompt
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Generate a high-converting thumbnail prompt for AI image generators.
      </p>

      <button
        onClick={generatePrompt}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-pink-600 py-3 font-bold transition hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Prompt"}
      </button>

      {prompt && (
        <>
          <div className="mt-6 whitespace-pre-wrap rounded-xl bg-zinc-900 p-4">
            {prompt}
          </div>

          <button
            onClick={copyPrompt}
            className="mt-4 w-full rounded-xl bg-zinc-800 py-3 font-semibold transition hover:bg-zinc-700"
          >
            📋 Copy Prompt
          </button>
        </>
      )}
    </div>
  );
}