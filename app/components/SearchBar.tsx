"use client";

import { Search, Sparkles } from "lucide-react";
import { translations } from "../lib/translations";


type SearchBarProps = {
  keyword: string;
  setKeyword: (value: string) => void;

  order: string;
  setOrder: (value: string) => void;

  loading: boolean;
  onSearch: () => void;

  min10Minutes: boolean;
  setMin10Minutes: (value: boolean) => void;

  last30Days: boolean;
  setLast30Days: (value: boolean) => void;
  language: string;
};

export default function SearchBar({
  keyword,
  setKeyword,
  order,
  setOrder,
  onSearch,
  loading,
  min10Minutes,
  setMin10Minutes,
  last30Days,
  setLast30Days,
  language,
}: SearchBarProps) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <div className="rounded-[32px]
border border-white/10
bg-white/5
p-10
shadow-[0_20px_80px_rgba(0,0,0,0.45)]
backdrop-blur-2xl
transition-all
duration-500">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
  {language === "ko"
    ? "AI 벤치마크 엔진"
    : "AI Benchmark Engine"}
</p>

          <h2 className="mt-2 text-3xl font-bold">
            {t.heroTitle}
          </h2>

          <p className="mt-2 text-zinc-400">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
            />

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-2xl border border-zinc-700 bg-black/40 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 transition-all duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none"
            />
          </div>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-2xl border border-zinc-700 bg-black/40 px-5 py-4 transition-all duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none"
          >
            <option value="relevance">
  {language === "ko"
    ? "🔥 관련도"
    : "🔥 Relevance"}
</option>

<option value="viewCount">
  {language === "ko"
    ? "👀 조회수"
    : "👀 View Count"}
</option>

<option value="date">
  {language === "ko"
    ? "🆕 최신순"
    : "🆕 Latest"}
</option>
          </select>

          <button
  onClick={onSearch}
  disabled={loading}
  className={`flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold text-white transition-all duration-300 ${
    loading
      ? "cursor-not-allowed opacity-60 bg-zinc-700"
      : "bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30 active:translate-y-0"
  }`}
>
  <Sparkles
    size={18}
    className={loading ? "animate-spin" : ""}
  />

  {loading ? t.loading : t.analyze}
</button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          {[
  t.featureAI,
  "Benchmark Score",
  t.featureCompetitor,
  t.featureIdeas,
  "Thumbnail Strategy",
  t.featurePDF,
].map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-700 bg-zinc-800/40 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-500 hover:text-white"
            >
              {item}
            </span>
          ))}

        </div>

      </div>
    </section>
  );
}