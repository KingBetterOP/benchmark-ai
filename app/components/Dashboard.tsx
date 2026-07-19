import { Video } from "@/app/lib/types";
import { calculateOpportunityScore } from "@/app/lib/opportunityScore";
type DashboardProps = {
  keyword: string;
  averageViews: number;
  videoCount: number;
  videos: Video[];
};

export default function Dashboard({
  keyword,
  averageViews,
  videoCount,
  videos,
}: DashboardProps) {
  if (!keyword || videoCount === 0) return null;
const opportunity = calculateOpportunityScore(videos);
  const stats = [
    {
      icon: "🔍",
      title: "Keyword",
      value: keyword,
      color: "from-cyan-500/20 to-blue-500/5",
    },
    {
      icon: "👀",
      title: "Average Views",
      value: averageViews.toLocaleString(),
      color: "from-emerald-500/20 to-green-500/5",
    },
    {
      icon: "🎥",
      title: "Videos",
      value: videoCount.toLocaleString(),
      color: "from-orange-500/20 to-red-500/5",
    },
  ];

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">

        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-zinc-800 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Live Dashboard
            </span>

            <h2 className="mt-5 text-4xl font-bold tracking-tight">
              Benchmark Overview
            </h2>

            <p className="mt-3 max-w-2xl text-zinc-400">
              AI has finished analyzing your benchmark. Review the key metrics
              below before exploring detailed insights.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              STATUS
            </p>

            <h3 className="mt-2 text-xl font-bold text-emerald-400">
              ● Analysis Complete
            </h3>
          </div>
        </div>
<div className="mx-8 mt-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 p-8">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        🚀 Opportunity Score
      </p>

      <h2 className="mt-3 text-6xl font-extrabold">
        {opportunity.score}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <p className="mt-4 text-zinc-300">
        {opportunity.recommendation}
      </p>
    </div>

    <div className="space-y-3 text-lg">
      <p>🟢 Competition: <strong>{opportunity.competition}</strong></p>
      <p>🔥 Viral Chance: <strong>{opportunity.viralChance}</strong></p>
      <p>📈 Growth: <strong>{opportunity.growth}</strong></p>
    </div>
  </div>
</div>
        {/* Cards */}
        <div className="grid gap-6 p-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`group rounded-3xl border border-zinc-800 bg-gradient-to-br ${stat.color} p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{stat.icon}</span>

                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
              </div>

              <p className="mt-8 text-sm uppercase tracking-[0.2em] text-zinc-400">
                {stat.title}
              </p>

              <h3 className="mt-3 break-words text-4xl font-extrabold text-white">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}