"use client";

import { useState } from "react";

type Props = {
  keyword: string;
};

export default function AIHashtagGeneratorCard({
  keyword,
}: Props) {
  const [hashtags, setHashtags] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHashtags = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/hashtags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setHashtags(data.hashtags);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6">

      <h2 className="text-2xl font-bold">
        🏷 AI Hashtag Generator
      </h2>

      <button
        onClick={generateHashtags}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-purple-600 py-3 font-bold transition hover:bg-purple-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Hashtags"}
      </button>

      {hashtags && (
        <div className="mt-6 whitespace-pre-wrap rounded-xl bg-zinc-900 p-4">
          {hashtags}
        </div>
      )}

    </div>
  );
}