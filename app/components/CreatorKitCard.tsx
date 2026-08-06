"use client";

import { useState } from "react";
import { CreatorKit } from "../lib/creatorKit";
import { translations } from "../lib/translations";

type Props = {
  keyword: string;
  language: string;
};

export default function CreatorKitCard({
  keyword,
  language,
}: Props) {
  const [loading, setLoading] = useState(false);

  const t =
    translations[
      language as keyof typeof translations
    ];

  const [loadingStep, setLoadingStep] =
    useState(t.preparingAI);

  const [result, setResult] =
    useState<CreatorKit | null>(null);

  const generateCreatorKit = async () => {
    if (!keyword) return;

    try {
      setLoading(true);

      setLoadingStep(
        t.researchingYoutube
      );

      const res = await fetch(
        "/api/ai/creator-kit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            keyword,
          }),
        }
      );

      const data = await res.json();

      setLoadingStep(t.writingScript);
      await new Promise((r) =>
        setTimeout(r, 500)
      );

      setLoadingStep(
        t.creatingThumbnail
      );
      await new Promise((r) =>
        setTimeout(r, 500)
      );

      setLoadingStep(
        t.finalizingCreatorKit
      );
      await new Promise((r) =>
        setTimeout(r, 500)
      );

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const text = JSON.stringify(
      result,
      null,
      2
    );

    const blob = new Blob([text], {
      type: "application/json",
    });

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = `${keyword}-creator-kit.json`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        {t.aiCreatorKit}
      </h2>

      <p className="mt-2 text-zinc-400">
        {t.aiCreatorKitDescription}
      </p>

      {loading && (
        <p className="mt-4 animate-pulse text-sm text-emerald-300">
          {loadingStep}
        </p>
      )}

      <button
        onClick={generateCreatorKit}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading
          ? t.generating
          : t.generateEverything}
      </button>

      {result && (
        <>
          <button
            onClick={downloadResult}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold transition hover:bg-blue-700"
          >
            {t.downloadCreatorKit}
          </button>

          <div className="mt-8 space-y-6">
            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.viralTitles}
              </h3>

              <ul className="space-y-2">
                {result.titles.map(
                  (title, index) => (
                    <li key={index}>
                      {index + 1}. {title}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.hook}
              </h3>

              <p>{result.hook}</p>
            </div>

            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.script}
              </h3>

              <p className="whitespace-pre-wrap">
                {result.script}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.description}
              </h3>

              <p className="whitespace-pre-wrap">
                {result.description}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.hashtags}
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.hashtags.map(
                  (tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-emerald-600 px-3 py-1 text-sm"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-xl bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="mb-3 text-xl font-bold">
                {t.thumbnailPrompt}
              </h3>

              <p className="whitespace-pre-wrap">
                {result.thumbnailPrompt}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}