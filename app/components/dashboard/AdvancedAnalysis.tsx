"use client";

import { Video } from "@/app/lib/types";

import PredictionCard from "../PredictionCard";
import AICopilot from "../AICopilot";
import SearchSEOCard from "../SearchSEOCard";
import CompetitorGapCard from "../CompetitorGapCard";
import ContentGapScoreCard from "../ContentGapScoreCard";
import KeywordClusterCard from "../KeywordClusterCard";
import ExecutiveSummaryCard from "../ExecutiveSummaryCard";
import CompetitionEngineCard from "../CompetitionEngineCard";
import CompetitionEngineV2Card from "../CompetitionEngineV2Card";
import TrendMomentumCard from "../TrendMomentumCard";

type Props = {
  show: boolean;

  keyword: string;
  videos: Video[];

  opportunity: any;
  trendingScore: number;

  revenue: any;

  executiveSummary: any;

  competitionEngine: any;

  competitionEngineV2: any;

  trendMomentum: any;

  contentGap: any;

  keywordCluster: string[];

  competitorGaps: any[];

  t: any;
};

export default function AdvancedAnalysis({
  show,
  keyword,
  videos,
  opportunity,
  trendingScore,
  revenue,
  executiveSummary,
  competitionEngine,
  competitionEngineV2,
  trendMomentum,
  contentGap,
  keywordCluster,
  competitorGaps,
  t,
}: Props) {
  if (!show) return null;

  return (
    <>
  <SearchSEOCard
    keyword={keyword}
    videos={videos}
  />

  <PredictionCard
    videos={videos}
  />

  <ExecutiveSummaryCard
    overall={executiveSummary.overall}
    verdict={executiveSummary.verdict}
    summary={executiveSummary.summary}
    color={executiveSummary.color}
  />

  <CompetitionEngineCard
    score={competitionEngine.score}
    density={competitionEngine.density}
    uploadFrequency={competitionEngine.uploadFrequency}
    viewVelocity={competitionEngine.viewVelocity}
    barrier={competitionEngine.barrier}
  />

  <CompetitionEngineV2Card
    score={competitionEngineV2.score}
    density={competitionEngineV2.density}
    engagement={competitionEngineV2.engagement}
    freshness={competitionEngineV2.freshness}
    velocity={competitionEngineV2.velocity}
    barrier={competitionEngineV2.barrier}
  />

  <TrendMomentumCard
    momentum={trendMomentum.momentum}
    growthRate={trendMomentum.growthRate}
    acceleration={trendMomentum.acceleration}
    lifecycle={trendMomentum.lifecycle}
    peakTiming={trendMomentum.peakTiming}
  />
    <ContentGapScoreCard
    score={contentGap.score}
    verdict={contentGap.verdict}
  />

  <KeywordClusterCard
    keywords={keywordCluster}
  />

  <CompetitorGapCard
    gaps={competitorGaps}
  />

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

    </>
  );
}