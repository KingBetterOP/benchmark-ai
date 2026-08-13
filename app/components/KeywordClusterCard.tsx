type Props = {
  keywords: string[];
};

export default function KeywordClusterCard({
  keywords,
}: Props) {
  if (keywords.length === 0) return null;

  return (
    <section className="mt-8 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        🧠 AI Keyword Cluster
      </h2>

      <p className="mt-2 text-zinc-400">
        Related content ideas generated from your keyword.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/30"
          >
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}