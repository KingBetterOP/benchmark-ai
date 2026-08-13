type Props = {
  score: number;
  density: number;
  uploadFrequency: number;
  viewVelocity: number;
  barrier: string;
};

export default function CompetitionEngineCard({
  score,
  density,
  uploadFrequency,
  viewVelocity,
  barrier,
}: Props) {
  const barrierColor =
    barrier === "LOW"
      ? "text-green-400"
      : barrier === "MEDIUM"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <section className="mt-8 rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        ⚔️ Competition Engine
      </h2>

      <p className="mt-2 text-zinc-400">
        Advanced competition analysis based on benchmark data.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-5">
        <MetricCard title="Score" value={`${score}/100`} />
        <MetricCard title="Density" value={`${density}%`} />
        <MetricCard
          title="Upload Frequency"
          value={`${uploadFrequency}/100`}
        />
        <MetricCard
          title="View Velocity"
          value={`${viewVelocity}/100`}
        />
        <MetricCard
          title="Barrier"
          value={barrier}
          valueClass={barrierColor}
        />
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  valueClass = "text-cyan-300",
}: {
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 text-center backdrop-blur-xl">
      <p className="text-zinc-400">{title}</p>

      <p className={`mt-3 text-3xl font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}