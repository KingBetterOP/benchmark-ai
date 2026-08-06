import { Video } from "@/app/lib/types";
import { calculateOpportunityScore } from "@/app/lib/opportunityScore";
import PredictionCard from "./PredictionCard";
import AICopilot from "./AICopilot";
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
const keywordDifficulty = Math.min(
  100,
  Math.round(
    (videoCount * 0.6) +
    (averageViews / 100000)
  )
);

const growthPotential =
  100 - keywordDifficulty;

const recommendedDuration =
  averageViews > 500000
    ? "12–18 min"
    : "8–12 min";

const bestUploadTime =
  "Fri • 7PM";
  const stats = [
    {
      icon: "🔍",
      title: t.keyword,
      value: keyword,
      color: "from-cyan-500/20 to-blue-500/5",
    },
    {
  icon: "🎯",
  title: t.keywordDifficulty,
  value: `${keywordDifficulty}/100`,
  color: "from-red-500/20 to-orange-500/5",
},
{
  icon: "🚀",
  title: t.growthPotential,
  value: `${growthPotential}/100`,
  color: "from-green-500/20 to-emerald-500/5",
},
{
  icon: "⏰",
  title: t.bestUpload,
  value: bestUploadTime,
  color: "from-blue-500/20 to-cyan-500/5",
},
{
  icon: "🎬",
  title: t.bestLength,
  value: recommendedDuration,
  color: "from-pink-500/20 to-fuchsia-500/5",
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
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 shadow-lg shadow-cyan-500/10">
  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
  {t.dashboardLive}
</span>

            <h2 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-3xl font-extrabold text-transparent">
  {t.dashboardOverview}
</h2>

<p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
  {t.analysisComplete}
</p>
          </div>

          <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-green-500/5 px-8 py-5 text-center shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              {t.status}
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-emerald-300">
              {t.statusComplete}
            </h3>
          </div>
        </div>
<div className="mx-8 mt-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/5 p-8 shadow-2xl shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
        {t.opportunityScore}
      </p>

      <h2 className="mt-3 bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-5xl font-extrabold text-transparent">
        {opportunity.score}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
        {opportunity.recommendation}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
  <p className="flex justify-between gap-8">
    <span className="text-zinc-400">
      {t.competitionLabel}
    </span>
    <strong>{opportunity.competition}</strong>
  </p>

  <p className="mt-4 flex justify-between gap-8">
    <span className="text-zinc-400">
      {t.viralChanceLabel}
    </span>
    <strong>{opportunity.viralChance}</strong>
  </p>

  <p className="mt-4 flex justify-between gap-8">
    <span className="text-zinc-400">
      {t.growthLabel}
    </span>
    <strong>{opportunity.growth}</strong>
  </p>
</div>
  </div>
</div>
<PredictionCard videos={videos} />
<AICopilot
  opportunity={opportunity.score}
  trending={trendingScore}
  revenue={revenue.average}
/>
<div className="mx-8 mt-8 overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-slate-900 to-red-500/5 p-8 shadow-2xl shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
        {t.trendingScore}
      </p>

      <h2 className="mt-3 bg-gradient-to-r from-orange-300 to-white bg-clip-text text-5xl font-extrabold text-transparent">
        {trendingScore}
        <span className="text-2xl text-zinc-400"> / 100</span>
      </h2>

      <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
        {trendingScore >= 80
  ? t.trendingHigh
  : trendingScore >= 50
  ? t.trendingMedium
  : t.trendingLow}
      </p>
    </div>

    <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-black/20 text-6xl backdrop-blur-xl">
      {trendingScore >= 80
        ? "📈"
        : trendingScore >= 50
        ? "➡️"
        : "📉"}
    </div>
  </div>
</div>
<div className="mx-8 mt-8 overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-green-500/5 p-8 shadow-2xl shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-emerald-400">
        {t.estimatedRevenue}
      </p>

      <h2 className="mt-3 bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-5xl font-extrabold text-transparent">
        ₩{revenue.average.toLocaleString()}
      </h2>

      <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
        {t.estimatedRevenueDescription}
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
  <p className="flex justify-between gap-10">
    <span className="text-zinc-400">
      {t.low}
    </span>
    <strong>
      ₩{revenue.low.toLocaleString()}
    </strong>
  </p>

  <p className="mt-4 flex justify-between gap-10">
    <span className="text-zinc-400">
      {t.average}
    </span>
    <strong>
      ₩{revenue.average.toLocaleString()}
    </strong>
  </p>

  <p className="mt-4 flex justify-between gap-10">
    <span className="text-zinc-400">
      {t.high}
    </span>
    <strong>
      ₩{revenue.high.toLocaleString()}
    </strong>
  </p>
</div>

  </div>
</div>
        {/* Cards */}
<div className="grid grid-cols-2 gap-6 p-8 lg:grid-cols-4">
  {stats.map((stat) => (
    <div
      key={stat.title}
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${stat.color} p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20`}
    >
      <div className="flex items-center justify-between">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{stat.icon}</span>

        <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        {stat.title}
      </p>

      <h3 className="mt-3 break-words text-3xl font-extrabold text-white">
        {stat.value}
      </h3>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}