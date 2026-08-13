type Props = {
  score: number;
  density: number;
  engagement: number;
  freshness: number;
  velocity: number;
  barrier: string;
};

export default function CompetitionEngineV2Card({
  score,
  density,
  engagement,
  freshness,
  velocity,
  barrier,
}: Props) {
  const barrierColor =
    barrier === "LOW"
      ? "text-green-400"
      : barrier === "MEDIUM"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <section className="mt-8 rounded-3xl border border-violet-500/30 bg-violet-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        🚀 Competition Engine V2
      </h2>

      <p className="mt-2 text-zinc-400">
        Advanced competition scoring with engagement and freshness.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-6">
        <Metric title="Score" value={`${score}/100`} />
        <Metric title="Density" value={`${density}%`} />
        <Metric title="Engagement" value={`${engagement}%`} />
        <Metric title="Freshness" value={`${freshness}/100`} />
        <Metric title="Velocity" value={`${velocity}/100`} />
        <Metric
          title="Barrier"
          value={barrier}
          valueClass={barrierColor}
        />
      </div>
    </section>
  );
}

function Metric({
  title,
  value,
  valueClass = "text-violet-300",
}: {
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 text-center backdrop-blur-xl">
      <p className="text-zinc-400">
        {title}
      </p>

      <p className={`mt-3 text-3xl font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}