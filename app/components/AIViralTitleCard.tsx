"use client";

import { useState } from "react";

type Props = {
  keyword: string;
};

export default function AIViralTitleCard({
  keyword,
}: Props) {
  const [titles, setTitles] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTitles = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/viral-title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setTitles(data.titles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyTitles = async () => {
    await navigator.clipboard.writeText(titles);
    alert("Titles copied!");
  };

  return (
    <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-6">

      <h2 className="text-2xl font-bold">
        🚀 AI Viral Title Generator
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Generate high CTR YouTube titles.
      </p>

      <button
        onClick={generateTitles}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Viral Titles"}
      </button>

      {titles && (
        <>
          <div className="mt-6 whitespace-pre-wrap rounded-xl bg-zinc-900 p-4">
            {titles}
          </div>

          <button
            onClick={copyTitles}
            className="mt-4 w-full rounded-xl bg-zinc-800 py-3 font-semibold transition hover:bg-zinc-700"
          >
            📋 Copy Titles
          </button>
        </>
      )}
    </div>
  );
}