import { Video } from "@/app/lib/types";
import { calculateOpportunityScore } from "@/app/lib/opportunityScore";
import PredictionCard from "./PredictionCard";
import { calculateTrendingScore } from "@/app/lib/trendingScore";
import { calculateRevenue } from "@/app/lib/revenueEstimator";
import { translations } from "../lib/translations";

type DashboardProps = {
  keyword: string;
  averageViews: number;
  videoCount: number;
  videos: Video[];
  language: string;
};

export default function Dashboard({
  keyword,
  averageViews,
  videoCount,
  videos,
  language,
}: DashboardProps) {
  if (!keyword || videoCount === 0) return null;
  const t =
  translations[language as keyof typeof translations];
const opportunity = calculateOpportunityScore(videos);
const trendingScore = calculateTrendingScore(videos);
const revenue = calculateRevenue(videos);
  const stats = [
    {
      icon: "🔍",
      title: t.keyword,
      value: keyword,
      color: "from-cyan-500/20 to-blue-500/5",
    },
    {
      icon: "👀",
      title: t.averageViewsCard,
      value: averageViews.toLocaleString(),
      color: "from-emerald-500/20 to-green-500/5",
    },
    {
      icon: "🎥",
      title: t.videosCard,
      value: videoCount.toLocaleString(),
      color: "from-orange-500/20 to-red-500/5",
    },
    {
  icon: "⚔️",
  title: t.competition,
  value: opportunity.competition,
  color: "from-purple-500/20 to-violet-500/5",
},
  ];

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">

        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-zinc-800 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {t.dashboardLive}
            </span>

            <h2 className="mt-2 text-2xl font-bold">
  {t.dashboardOverview}
</h2>

<p className="mt-1 text-sm text-zinc-400">
  {t.analysisComplete}
</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              {t.status}
            </p>

            <h3 className="mt-2 text-xl font-bold text-emerald-400">
              {t.statusComplete}
            </h3>
          </div>
        </div>
<div className="mx-8 mt-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/5 p-5">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        {t.opportunityScore}
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        {opportunity.score}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <p className="mt-4 text-zinc-300">
        {opportunity.recommendation}
      </p>
    </div>

    <div className="space-y-3 text-lg">
      <p>
  {t.competitionLabel}: <strong>{opportunity.competition}</strong>
</p>

<p>
  {t.viralChanceLabel}: <strong>{opportunity.viralChance}</strong>
</p>

<p>
  {t.growthLabel}: <strong>{opportunity.growth}</strong>
</p>
    </div>
  </div>
</div>
<PredictionCard videos={videos} />
<div className="mx-8 mt-6 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/5 p-5">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
        {t.trendingScore}
      </p>

      <h2 className="mt-2 text-4xl font-extrabold">
        {trendingScore}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <p className="mt-3 text-zinc-300">
        {trendingScore >= 80
  ? t.trendingHigh
  : trendingScore >= 50
  ? t.trendingMedium
  : t.trendingLow}
      </p>
    </div>

    <div className="text-6xl">
      {trendingScore >= 80
        ? "📈"
        : trendingScore >= 50
        ? "➡️"
        : "📉"}
    </div>
  </div>
</div>
<div className="mx-8 mt-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-green-500/5 p-5">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
        {t.estimatedRevenue}
      </p>

      <h2 className="mt-2 text-3xl font-extrabold">
        ₩{revenue.average.toLocaleString()}
      </h2>

      <p className="mt-2 text-zinc-300">
        {t.estimatedRevenueDescription}
      </p>
    </div>

    <div className="space-y-2 text-right">
      <p>{t.low}: ₩{revenue.low.toLocaleString()}</p>
      <p>{t.average}: ₩{revenue.average.toLocaleString()}</p>
      <p>{t.high}: ₩{revenue.high.toLocaleString()}</p>
    </div>

  </div>
</div>
        {/* Cards */}
<div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
  {stats.map((stat) => (
    <div
      key={stat.title}
      className={`group rounded-3xl border border-zinc-800 bg-gradient-to-br ${stat.color} p-5 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl">{stat.icon}</span>

        <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-zinc-400">
        {stat.title}
      </p>

      <h3 className="mt-2 break-words text-2xl font-bold text-white">
        {stat.value}
      </h3>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}