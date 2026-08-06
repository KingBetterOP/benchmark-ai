type Props = {
  history: string[];
  onSelect: (keyword: string) => void;
  language: string;
};

export default function RecentSearches({
  history,
  onSelect,
  language,
}: Props) {
  if (history.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-xl font-bold">
        {language === "ko"
  ? "🕒 최근 검색"
  : "🕒 Recent Searches"}
      </h2>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="rounded-lg border border-gray-700 px-3 py-2 hover:bg-zinc-800"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}