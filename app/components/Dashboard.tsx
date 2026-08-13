"use client";

import { useState } from "react";

import { Video } from "@/app/lib/types";
import { calculateOpportunityScore } from "@/app/lib/opportunityScore";
import { calculateTrendingScore } from "@/app/lib/trendingScore";
import { calculateRevenue } from "@/app/lib/revenueEstimator";
import { findCompetitorGaps } from "@/app/lib/competitorGap";
import { calculateContentGapScore } from "@/app/lib/contentGapScore";
import { generateKeywordCluster } from "@/app/lib/keywordCluster";
import { generateExecutiveSummary } from "@/app/lib/executiveSummary";
import { calculateCompetitionEngine } from "@/app/lib/competitionEngine";
import { calculateCompetitionEngineV2 } from "@/app/lib/competitionEngineV2";
import { calculateTrendMomentum } from "@/app/lib/trendMomentum";
import { calculateOpportunityScoreV2 } from "@/app/lib/opportunityScoreV2";

import PredictionCard from "./PredictionCard";
import AICopilot from "./AICopilot";
import SearchSEOCard from "./SearchSEOCard";
import CompetitorGapCard from "./CompetitorGapCard";
import ContentGapScoreCard from "./ContentGapScoreCard";
import KeywordClusterCard from "./KeywordClusterCard";
import ExecutiveSummaryCard from "./ExecutiveSummaryCard";
import CompetitionEngineCard from "./CompetitionEngineCard";
import CompetitionEngineV2Card from "./CompetitionEngineV2Card";
import TrendMomentumCard from "./TrendMomentumCard";
import DashboardHeader from "./dashboard/DashboardHeader";
import BenchmarkScore from "./dashboard/BenchmarkScore";
import ActionPlan from "./dashboard/ActionPlan";
import StatsGrid from "./dashboard/StatsGrid";
import AdvancedAnalysis from "./dashboard/AdvancedAnalysis";
import OpportunityScoreV2Card from "./dashboard/OpportunityScoreV2Card";
import VerdictCard from "./VerdictCard";
import LoadingSkeleton from "./dashboard/LoadingSkeleton";


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
  const [showAdvanced, setShowAdvanced] =
    useState(false);

  if (!keyword || videoCount === 0) return null;

  const t =
    translations[
      language as keyof typeof translations
    ];

  const opportunity =
    calculateOpportunityScore(videos);

    const opportunityV2 =
  calculateOpportunityScoreV2(videos);

  const trendingScore =
    calculateTrendingScore(videos);

  const revenue =
    calculateRevenue(videos);

    const trendMomentum = calculateTrendMomentum(videos);

    const competitionEngine =
  calculateCompetitionEngine(videos);

  const competitionEngineV2 =
  calculateCompetitionEngineV2(videos);

    const competitorGaps = findCompetitorGaps(videos);

    const contentGap = calculateContentGapScore(competitorGaps);

    const executiveSummary = generateExecutiveSummary({
  opportunity: opportunity.score,
  trending: trendingScore,
  gapScore: contentGap.score,
});

    const keywordCluster = generateKeywordCluster(keyword);

  const keywordDifficulty = Math.min(
    100,
    Math.round(
      videoCount * 0.6 +
      averageViews / 100000
    )
  );

  const growthPotential =
    100 - keywordDifficulty;

  const recommendedDuration =
    averageViews > 500000
      ? "12–18 min"
      : "8–12 min";

  const bestUploadTime =
    "Fri • 7 PM";

  const stats = [
    {
      icon: "🔍",
      title: t.keyword,
      value: keyword,
      color:
        "from-cyan-500/20 to-blue-500/5",
    },
    {
      icon: "🎯",
      title: t.keywordDifficulty,
      value: `${keywordDifficulty}/100`,
      color:
        "from-red-500/20 to-orange-500/5",
    },
    {
      icon: "🚀",
      title: t.growthPotential,
      value: `${growthPotential}/100`,
      color:
        "from-green-500/20 to-emerald-500/5",
    },
    {
      icon: "⏰",
      title: t.bestUpload,
      value: bestUploadTime,
      color:
        "from-blue-500/20 to-cyan-500/5",
    },
    {
      icon: "🎬",
      title: t.bestLength,
      value: recommendedDuration,
      color:
        "from-pink-500/20 to-fuchsia-500/5",
    },
    {
      icon: "👀",
      title: t.averageViewsCard,
      value:
        averageViews.toLocaleString(),
      color:
        "from-emerald-500/20 to-green-500/5",
    },
    {
      icon: "🎥",
      title: t.videosCard,
      value:
        videoCount.toLocaleString(),
      color:
        "from-orange-500/20 to-red-500/5",
    },
    {
      icon: "⚔️",
      title: t.competition,
      value: opportunity.competition,
      color:
        "from-purple-500/20 to-violet-500/5",
    },
  ];

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-2xl">
                <DashboardHeader
  dashboardLive={t.dashboardLive}
  analysisComplete={t.analysisComplete}
/>
                <BenchmarkScore
  score={opportunity.score}
  recommendation={opportunity.recommendation}
  competitionLabel={t.competitionLabel}
  competition={opportunity.competition}
  viralChanceLabel={t.viralChanceLabel}
  viralChance={opportunity.viralChance}
  growthLabel={t.growthLabel}
  growth={opportunity.growth}
/>
<VerdictCard
  verdict={opportunityV2.verdictEngine.verdict}
  confidence={opportunityV2.verdictEngine.confidence}
  summary={opportunityV2.verdictEngine.summary}
/>
<OpportunityScoreV2Card
  score={opportunityV2.total}
  confidence={opportunityV2.confidence}
  verdict={opportunityV2.verdict}
  demand={opportunityV2.demand}
  competition={opportunityV2.competition}
  trend={opportunityV2.trend}
  ctr={opportunityV2.ctr}
  thumbnail={opportunityV2.thumbnail}
  title={opportunityV2.title}
  freshness={opportunityV2.freshness}
  gap={opportunityV2.gap}
/>
<ActionPlan
  showAdvanced={showAdvanced}
  onToggle={() => setShowAdvanced(!showAdvanced)}
/>

<AdvancedAnalysis
  show={showAdvanced}
  keyword={keyword}
  videos={videos}
  opportunity={opportunity}
  trendingScore={trendingScore}
  revenue={revenue}
  executiveSummary={executiveSummary}
  competitionEngine={competitionEngine}
  competitionEngineV2={competitionEngineV2}
  trendMomentum={trendMomentum}
  contentGap={contentGap}
  keywordCluster={keywordCluster}
  competitorGaps={competitorGaps}
  t={t}
/>

<StatsGrid stats={stats} />
                
        

      </div>
    </section>
  );
}