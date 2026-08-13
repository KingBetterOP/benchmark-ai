type Props = {
  keyword?: string;
};

export default function EmptyState({
  keyword,
}: Props) {
  return (
    <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">

      <div className="text-7xl">🔍</div>

      <h2 className="mt-6 text-3xl font-bold text-white">
        No Results Found
      </h2>

      <p className="mt-4 text-zinc-400">
        {keyword
          ? `No YouTube videos were found for "${keyword}".`
          : "Search for a keyword to begin your analysis."}
      </p>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

        <p className="font-semibold text-cyan-300">
          Suggestions
        </p>

        <ul className="mt-4 space-y-2 text-zinc-300">
          <li>• Try a broader keyword</li>
          <li>• Check the spelling</li>
          <li>• Remove unnecessary words</li>
          <li>• Search a trending topic</li>
        </ul>

      </div>

    </div>
  );
}