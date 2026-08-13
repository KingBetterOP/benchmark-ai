"use client";

import { useCallback } from "react";

import {
  calculateOpportunityScoreV2,
} from "../lib/opportunityScoreV2";

import type {
  SavedProject,
} from "../lib/projectStorage";

import type {
  Video,
  Channel,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  Opportunity,
  CreatorKit,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ContentStrategy,
  CreatorWorkspaceData,
  ThumbnailAnalysis,
  MissedOpportunity,
} from "../lib/types";

import type {
  PlannerResponse,
} from "../types/planner";

import type {
  BuildProjectDataOptions,
} from "./useProjectManager";

/* ============================================================
   LOCAL TYPES
   ============================================================ */

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type KeywordIntelligence = {
  difficulty: number;
  opportunity: number;
  trend: string;
  demand: string;
  uploadTime: string;
  audience: string;
  expectedViews: string;
  expectedCTR: string;
  estimatedRPM: string;
  estimatedRevenue: string;
  recommendation: string;
  confidence: number;
};

type ViralPrediction = {
  successProbability: number;
  expectedViews: string;
  expectedCTR: string;
  estimatedRPM: string;
  estimatedRevenue: string;
  competition: string;
  recommendation: string;
  confidence: number;
};

type TitleAnalysis = {
  ctrScore: number;
  seoScore: number;
  emotionScore: number;
  curiosityScore: number;
  lengthScore: number;
  overallScore: number;
  improvements: string[];
  betterTitles: string[];
};

/* ============================================================
   INPUT TYPES
   ============================================================ */

type UseProjectDataBuilderProps = {
  keyword: string;

  results: Video[];
  topVideos: Video[];
  channels: Channel[];
  averageViews: number;

  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  recommendedChannels: string;

  keywordIntelligence: KeywordIntelligence;
  viralPrediction: ViralPrediction;

  thumbnailAnalysis: ThumbnailAnalysis;
  titleAnalysis: TitleAnalysis;

  seoAnalysis: SEOAnalysis | null;
  seoOptimizer: SEOOptimizer | null;

  contentGap: ContentGap[];
  channelAudit: ChannelAudit | null;
  contentPlanner: ContentPlanner[];
  aiThumbnail: AIThumbnail[];

  opportunities: Opportunity[];
  missedOpportunities: MissedOpportunity[];

  contentStrategy: ContentStrategy | null;
  planner: PlannerResponse | null;

  creatorKit: CreatorKit | null;
  creatorWorkspace: CreatorWorkspaceData;

  messages: ChatMessage[];
};

/* ============================================================
   HOOK
   ============================================================ */

export function useProjectDataBuilder({
  keyword,

  results,
  topVideos,
  channels,
  averageViews,

  report,
  idea,
  strategy,
  competition,
  titles,
  recommendedChannels,

  keywordIntelligence,
  viralPrediction,

  thumbnailAnalysis,
  titleAnalysis,

  seoAnalysis,
  seoOptimizer,

  contentGap,
  channelAudit,
  contentPlanner,
  aiThumbnail,

  opportunities,
  missedOpportunities,

  contentStrategy,
  planner,

  creatorKit,
  creatorWorkspace,

  messages,
}: UseProjectDataBuilderProps) {
  const buildProjectData = useCallback(
    ({
      targetKeyword = keyword,
      workspaceOverride,
      processedOverride,
      aiOverride,
      missedOpportunitiesOverride,
      thumbnailAnalysisOverride,
      titleAnalysisOverride,
      contentStrategyOverride,
      plannerOverride,
    }: BuildProjectDataOptions = {}): Omit<
      SavedProject,
      "id"
    > => {
      /* ======================================================
         PROCESSED DATA
         ====================================================== */

      const processedData = {
        averageViews:
          processedOverride?.averageViews ??
          averageViews,

        results:
          processedOverride?.results ??
          results,

        topVideos:
          processedOverride?.topVideos ??
          topVideos,

        channels:
          processedOverride?.channels ??
          channels,
      };

      /* ======================================================
         AI DATA
         ====================================================== */

      const aiData = {
        report:
          aiOverride?.report ??
          report,

        idea:
          aiOverride?.idea ??
          idea,

        strategy:
          aiOverride?.strategy ??
          strategy,

        competition:
          aiOverride?.competition ??
          competition,

        titles:
          aiOverride?.titles ??
          titles,

        recommendedChannels:
          aiOverride?.recommendedChannels ??
          recommendedChannels,

        seoAnalysis:
          aiOverride?.seoAnalysis ??
          seoAnalysis,

        seoOptimizer:
          aiOverride?.seoOptimizer ??
          seoOptimizer,

        contentGap:
          aiOverride?.contentGap ??
          contentGap,

        channelAudit:
          aiOverride?.channelAudit ??
          channelAudit,

        contentPlanner:
          aiOverride?.contentPlanner ??
          contentPlanner,

        aiThumbnail:
          aiOverride?.aiThumbnail ??
          aiThumbnail,

        creatorKit:
          aiOverride?.creatorKit ??
          creatorKit,
      };

      /* ======================================================
         PROJECT SNAPSHOT
         ====================================================== */

      return {
        createdAt: Date.now(),

        keyword: targetKeyword,

        results:
          processedData.results,

        topVideos:
          processedData.topVideos,

        channels:
          processedData.channels,

        averageViews:
          processedData.averageViews,

        report:
          aiData.report,

        idea:
          aiData.idea,

        strategy:
          aiData.strategy,

        competition:
          aiData.competition,

        titles:
          aiData.titles,

        recommendedChannels:
          aiData.recommendedChannels,

        keywordIntelligence,

        viralPrediction,

        thumbnailAnalysis:
          thumbnailAnalysisOverride ??
          thumbnailAnalysis,

        titleAnalysis:
          titleAnalysisOverride ??
          titleAnalysis,

        seoAnalysis:
          aiData.seoAnalysis,

        seoOptimizer:
          aiData.seoOptimizer,

        contentGap:
          aiData.contentGap,

        channelAudit:
          aiData.channelAudit,

        contentPlanner:
          aiData.contentPlanner,

        aiThumbnail:
          aiData.aiThumbnail,

        opportunities,

        missedOpportunities:
          missedOpportunitiesOverride ??
          missedOpportunities,

        contentStrategy:
          contentStrategyOverride ??
          contentStrategy,

        planner:
          plannerOverride ??
          planner,

        creatorKit:
          aiData.creatorKit,

        opportunityScoreV2:
          calculateOpportunityScoreV2(
            processedData.results
          ),

        creatorWorkspace:
          workspaceOverride ??
          creatorWorkspace,

        chatMessages:
          messages,
      };
    },
    [
      keyword,
      averageViews,
      results,
      topVideos,
      channels,
      report,
      idea,
      strategy,
      competition,
      titles,
      recommendedChannels,
      seoAnalysis,
      seoOptimizer,
      contentGap,
      channelAudit,
      contentPlanner,
      aiThumbnail,
      creatorKit,
      opportunities,
      keywordIntelligence,
      viralPrediction,
      thumbnailAnalysis,
      titleAnalysis,
      missedOpportunities,
      contentStrategy,
      planner,
      creatorWorkspace,
      messages,
    ]
  );

  return {
    buildProjectData,
  };
}