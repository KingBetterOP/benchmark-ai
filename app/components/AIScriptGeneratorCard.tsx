"use client";

import { useState } from "react";
import { translations } from "../lib/translations";

type Props = {
  keyword: string;
  language: string;
};

export default function AIScriptGeneratorCard({
  keyword,
  language,
}: Props) {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const t =
  translations[language as keyof typeof translations];

  const generateScript = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ai/script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      });

      const data = await res.json();

      setScript(data.script);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">

      <h2 className="text-2xl font-bold">
        {t.aiDescriptionGenerator}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Generate a complete YouTube script in one click.
      </p>

      <button
        onClick={generateScript}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-emerald-600 py-3 font-bold transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : t.generateScript}
      </button>

      {script && (
        <div className="mt-6 rounded-xl bg-white/5 backdrop-blur-xl p-4 whitespace-pre-wrap">
          {script}
        </div>
      )}
    </div>
  );
}