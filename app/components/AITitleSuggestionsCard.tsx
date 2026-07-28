"use client";

import { useState } from "react";
import { Video } from "../lib/types";

type Props = {
  video: Video;
};

export default function AITitleSuggestionsCard({
  video,
}: Props) {
  const [generatedTitles, setGeneratedTitles] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const generateAITitles = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: video.snippet.title,
        }),
      });

      const data = await res.json();

      setGeneratedTitles(data.titles ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">

      <p className="mb-3 text-sm font-semibold text-violet-300">
        ✨ AI Title Suggestions
      </p>

      <button
        onClick={generateAITitles}
        disabled={loading}
        className="mb-4 w-full rounded-lg bg-violet-600 px-4 py-3 font-semibold transition hover:bg-violet-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "🤖 Generate AI Titles"}
      </button>

      {generatedTitles.length === 0 ? (
        <p className="text-sm text-zinc-400">
          Click the button above to generate AI title ideas.
        </p>
      ) : (
        <div className="space-y-2">
          {generatedTitles.map((title, index) => (
            <div
              key={index}
              className="rounded-lg bg-zinc-800/50 p-3"
            >
              <p className="text-sm text-zinc-200">
                {index + 1}. {title}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}