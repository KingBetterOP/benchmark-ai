type Props = {
  opportunity: number;
  trending: number;
  revenue: number;
};

export default function AICopilot({
  opportunity,
  trending,
  revenue,
}: Props) {
  const recommendation =
    opportunity >= 80
      ? "🚀 Create this video now."
      : opportunity >= 60
      ? "⏳ Wait and monitor."
      : "🛑 Look for another keyword.";

  const confidence = Math.min(
    99,
    Math.round(
      opportunity * 0.45 +
      trending * 0.35 +
      20
    )
  );

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6">

      <h2 className="text-3xl font-bold">
        🧠 t.aiCopilot
      </h2>

      <p className="mt-2 text-zinc-400">
  t.aiCopilotDescription
</p>

<div className="mt-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-5">

  <p className="text-sm uppercase tracking-widest text-emerald-300">
    t.highestPriority
  </p>

  <h2 className="mt-2 text-3xl font-extrabold text-emerald-300">
    🚀 t.makeThisVideo
  </h2>

  <p className="mt-2 text-zinc-300">
    Confidence 94%
  </p>

</div>
      <div className="mt-6 space-y-3">

        <p>🔥 t.opportunity: {opportunity}/100</p>

        <p>📈 t.trend: {trending}/100</p>

        <p>💰 t.revenue: ₩{revenue.toLocaleString()}</p>

        <p className="font-bold text-cyan-300">
          {recommendation}
        </p>

        <p className="text-sm text-zinc-500">
          t.confidence {confidence}%
        </p>

      </div>

    </section>
  );
}