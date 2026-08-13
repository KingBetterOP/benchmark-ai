type Props = {
  score: number;
  recommendation: string;
  competitionLabel: string;
  competition: string;
  viralChanceLabel: string;
  viralChance: string;
  growthLabel: string;
  growth: string;
};

export default function BenchmarkScore({
  score,
  recommendation,
  competitionLabel,
  competition,
  viralChanceLabel,
  viralChance,
  growthLabel,
  growth,
}: Props) {
  return (
    <div className="mx-8 mt-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/5 p-8 shadow-2xl shadow-cyan-500/10">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Benchmark Score™
          </p>

          <h2 className="mt-3 bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-5xl font-extrabold text-transparent">
            {score}
            <span className="text-2xl text-zinc-400">
              {" "}
              / 100
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
            {recommendation}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">

          <p className="flex justify-between gap-8">
            <span className="text-zinc-400">
              {competitionLabel}
            </span>

            <strong>{competition}</strong>
          </p>

          <p className="mt-4 flex justify-between gap-8">
            <span className="text-zinc-400">
              {viralChanceLabel}
            </span>

            <strong>{viralChance}</strong>
          </p>

          <p className="mt-4 flex justify-between gap-8">
            <span className="text-zinc-400">
              {growthLabel}
            </span>

            <strong>{growth}</strong>
          </p>

        </div>

      </div>

    </div>
  );
}