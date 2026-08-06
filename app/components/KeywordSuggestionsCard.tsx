"use client";

import { getKeywordSuggestions } from "../lib/keywordSuggestions";

type Props = {
  keyword: string;
  onSelect: (keyword: string) => void;
  language: string;
};

export default function KeywordSuggestionsCard({
  keyword,
  onSelect,
  language,
}: Props) {
  const suggestions = getKeywordSuggestions(keyword);

  if (!keyword || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
      <h2 className="text-xl font-bold">
        {language === "ko"
  ? "🔥 추천 키워드"
  : "🔥 Suggested Keywords"}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        {language === "ko"
  ? "키워드를 클릭하면 즉시 분석합니다."
  : "Click a keyword to analyze it instantly."}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-full border border-orange-500/30 bg-white/5 backdrop-blur-xl px-4 py-2 text-sm transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}