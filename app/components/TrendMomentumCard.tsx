type Props = {
  momentum: number;
  growthRate: number;
  acceleration: number;
  lifecycle: string;
  peakTiming: string;
};

export default function TrendMomentumCard({
  momentum,
  growthRate,
  acceleration,
  lifecycle,
  peakTiming,
}: Props) {
  return (
    <section className="mt-8 rounded-3xl border border-sky-500/30 bg-sky-500/10 p-8">
      <h2 className="text-3xl font-extrabold">
        📈 Trend Momentum
      </h2>

      <p className="mt-2 text-zinc-400">
        Detect how fast this keyword is gaining momentum.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-5">
        <Metric title="Momentum" value={`${momentum}/100`} />
        <Metric title="Growth Rate" value={`${growthRate}%`} />
        <Metric title="Acceleration" value={`${acceleration}%`} />
        <Metric title="Lifecycle" value={lifecycle} />
        <Metric title="Peak Timing" value={peakTiming} />
      </div>
    </section>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-5 text-center backdrop-blur-xl">
      <p className="text-zinc-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-sky-300">
        {value}
      </p>
    </div>
  );
}