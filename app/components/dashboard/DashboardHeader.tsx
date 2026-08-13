type Props = {
  dashboardLive: string;
  analysisComplete: string;
};

export default function DashboardHeader({
  dashboardLive,
  analysisComplete,
}: Props) {
  return (
    <div className="flex flex-col gap-6 border-b border-zinc-800 p-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 shadow-lg shadow-cyan-500/10">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {dashboardLive}
        </span>

        <h2 className="mt-4 bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-3xl font-extrabold text-transparent">
          Benchmark Verdict™
        </h2>

        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
          {analysisComplete}
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-green-500/5 px-8 py-5 text-center shadow-lg shadow-emerald-500/10">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
          AI VERDICT
        </p>

        <h3 className="mt-2 text-2xl font-extrabold text-emerald-300">
          🟢 Strong Opportunity
        </h3>
      </div>
    </div>
  );
}