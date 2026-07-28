"use client";

import { getKeywordSuggestions } from "../lib/keywordSuggestions";

type Props = {
  keyword: string;
  onSelect: (keyword: string) => void;
};

export default function KeywordSuggestionsCard({
  keyword,
  onSelect,
}: Props) {
  const suggestions = getKeywordSuggestions(keyword);

  if (!keyword || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
      <h2 className="text-xl font-bold">
        🔥 Suggested Keywords
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Click a keyword to analyze it instantly.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-full border border-orange-500/30 bg-zinc-900 px-4 py-2 text-sm transition hover:border-orange-400 hover:bg-orange-500 hover:text-white"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}