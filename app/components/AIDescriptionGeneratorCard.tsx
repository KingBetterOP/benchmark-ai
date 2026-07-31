"use client";

import { useState } from "react";
import { translations } from "../lib/translations";

type Props = {
  keyword: string;
  language: string;
};

export default function AIDescriptionGeneratorCard({
  keyword,
  language,
}: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const t =
  translations[language as keyof typeof translations];

  const generateDescription = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setDescription(data.description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyDescription = async () => {
    await navigator.clipboard.writeText(description);
    alert("Description copied!");
  };

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">

      <h2 className="text-2xl font-bold">
        {t.aiDescriptionGenerator}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        {t.aiDescriptionDescription}
      </p>

      <button
        onClick={generateDescription}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-bold transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
  ? t.generating
  : t.generateDescription}
      </button>

      {description && (
        <>
          <div className="mt-6 whitespace-pre-wrap rounded-xl bg-zinc-900 p-4">
            {description}
          </div>

          <button
            onClick={copyDescription}
            className="mt-4 w-full rounded-xl bg-zinc-800 py-3 font-semibold transition hover:bg-zinc-700"
          >
            📋 Copy Description
          </button>
        </>
      )}

    </div>
  );
}