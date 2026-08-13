type Props = {
  overall: number;
  verdict: string;
  summary: string;
  color: string;
};

export default function ExecutiveSummaryCard({
  overall,
  verdict,
  summary,
  color,
}: Props) {
  const colorClasses =
    color === "green"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : color === "yellow"
      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
      : "border-red-500/30 bg-red-500/10 text-red-300";

  return (
    <section
      className={`mt-8 rounded-3xl border p-8 ${colorClasses}`}
    >
      <p className="text-sm uppercase tracking-[0.3em]">
        AI EXECUTIVE SUMMARY
      </p>

      <h2 className="mt-4 text-5xl font-extrabold">
        {overall}
        <span className="text-2xl text-zinc-400"> /100</span>
      </h2>

      <div className="mt-6 rounded-2xl bg-black/20 p-5">
        <h3 className="text-2xl font-bold">
          {verdict}
        </h3>

        <p className="mt-3 text-zinc-200">
          {summary}
        </p>
      </div>
    </section>
  );
}