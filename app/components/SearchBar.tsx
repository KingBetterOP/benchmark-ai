"use client";

import { Search, Sparkles } from "lucide-react";

type SearchBarProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  order: string;
  setOrder: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
};

export default function SearchBar({
  keyword,
  setKeyword,
  order,
  setOrder,
  onSearch,
  loading,
}: SearchBarProps) {
  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-xl">

        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            AI Benchmark Engine
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Analyze any YouTube keyword
          </h2>

          <p className="mt-2 text-zinc-400">
            Get competitor analysis, AI reports, content ideas and benchmark
            scores in seconds.
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
              placeholder="Search YouTube keyword..."
              className="w-full rounded-2xl border border-zinc-700 bg-black/40 py-4 pl-14 pr-5 text-white placeholder:text-zinc-500 transition-all duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none"
            />
          </div>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-2xl border border-zinc-700 bg-black/40 px-5 py-4 transition-all duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 outline-none"
          >
            <option value="relevance">🔥 Relevance</option>
            <option value="viewCount">👀 View Count</option>
            <option value="date">🆕 Latest</option>
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

  {loading ? "Analyzing..." : "Analyze"}
</button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">

          {[
            "AI Analysis",
            "Benchmark Score",
            "Competitor Research",
            "Content Ideas",
            "Thumbnail Strategy",
            "PDF Export",
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