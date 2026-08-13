type Props = {
  score: number;
  verdict: string;
};

export default function ContentGapScoreCard({
  score,
  verdict,
}: Props) {
  const stars =
    score >= 90
      ? "★★★★★"
      : score >= 80
      ? "★★★★☆"
      : score >= 70
      ? "★★★☆☆"
      : score >= 60
      ? "★★☆☆☆"
      : "★☆☆☆☆";

  return (
    <section className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
        AI CONTENT GAP SCORE
      </p>

      <h2 className="mt-3 text-5xl font-extrabold text-emerald-300">
        {score}
        <span className="text-2xl text-zinc-400"> /100</span>
      </h2>

      <p className="mt-3 text-2xl font-bold">
        {stars}
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="text-zinc-400">
          Verdict
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {verdict}
        </h3>
      </div>
    </section>
  );
}