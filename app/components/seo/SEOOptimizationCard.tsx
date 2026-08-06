"use client";

import { motion } from "framer-motion";
import { SEOOptimizer } from "../../lib/types";

type Props = {
  optimizer: SEOOptimizer | null;
  language: string;
};

export default function SEOOptimizationCard({
  optimizer,
  language,
}: Props) {
  if (!optimizer) return null;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-8">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          AI SEO
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          {language === "ko"
            ? "AI SEO 최적화"
            : "AI SEO Optimization"}
        </h2>

      </div>

      <div className="space-y-6">

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-white/10 bg-black/20 p-5"
        >
          <div className="flex items-center justify-between">

            <h3 className="font-bold text-white">
              {language === "ko"
                ? "추천 제목"
                : "Better Title"}
            </h3>

            <button
              onClick={() =>
                copy(optimizer.betterTitle)
              }
              className="rounded-lg bg-cyan-600 px-3 py-1 text-sm"
            >
              {language === "ko"
                ? "복사"
                : "Copy"}
            </button>

          </div>

          <p className="mt-4 text-zinc-300">
            {optimizer.betterTitle}
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-white/10 bg-black/20 p-5"
        >
          <div className="flex items-center justify-between">

            <h3 className="font-bold text-white">
              {language === "ko"
                ? "추천 설명"
                : "Better Description"}
            </h3>

            <button
              onClick={() =>
                copy(
                  optimizer.betterDescription
                )
              }
              className="rounded-lg bg-cyan-600 px-3 py-1 text-sm"
            >
              {language === "ko"
                ? "복사"
                : "Copy"}
            </button>

          </div>

          <p className="mt-4 whitespace-pre-wrap text-zinc-300">
            {optimizer.betterDescription}
          </p>

        </motion.div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <h3 className="font-bold text-white">
            {language === "ko"
              ? "추천 태그"
              : "Recommended Tags"}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">

            {optimizer.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300"
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <h3 className="font-bold text-white">
            {language === "ko"
              ? "검색 의도"
              : "Search Intent"}
          </h3>

          <p className="mt-3 text-zinc-300">
            {optimizer.searchIntent}
          </p>

        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

          <h3 className="font-bold text-cyan-300">
            {language === "ko"
              ? "AI SEO 팁"
              : "AI SEO Tips"}
          </h3>

          <ul className="mt-4 space-y-3">

            {optimizer.rankingTips.map(
              (tip, index) => (
                <li
                  key={index}
                  className="text-zinc-200"
                >
                  • {tip}
                </li>
              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}