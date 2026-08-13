import type {
  Video,
  Channel,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
  Opportunity,
  CreatorKit,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ContentStrategy,
} from "../types";

import type { PlannerResponse } from "../../types/planner";

/* ============================================================
   PROCESSED RESULTS
   ============================================================ */

export type ProcessedResults = {
  averageViews: number;
  results: Video[];
  topVideos: Video[];
  channels: Channel[];
};

/* ============================================================
   AI RESULTS
   ============================================================ */

export type AIResults = {
  report: BenchmarkReport | null;

  idea: ContentIdea[];

  strategy: Strategy[];

  competition: CompetitionAnalysis | null;

  titles: TitleSuggestion[];

  seo: SEOAnalysis;

  seoOptimizer: SEOOptimizer | null;

  contentGap: ContentGap[];

  channelAudit: ChannelAudit | null;

  contentPlanner: ContentPlanner[];

  aiThumbnail: AIThumbnail[];

  thumbnail: ThumbnailPlan[];

  creatorKit: CreatorKit | null;

  recommendedChannels: string;

  opportunities: Opportunity[];
};

/* ============================================================
   SEARCH RESULT ANALYSIS
   ============================================================ */

export type SearchResultAnalysis = {
  keywordIntelligence: {
    opportunity: number;
    difficulty: number;
    expectedViews: string;
    expectedCTR: string;
    estimatedRPM: string;
    estimatedRevenue: string;
    trend: string;
    recommendation: string;
    confidence: number;
  };

  missedOpportunities: unknown;

  thumbnailAnalysis: unknown;

  titleAnalysis: {
    ctrScore: number;
    seoScore: number;
    emotionScore: number;
    curiosityScore: number;
    lengthScore: number;
    overallScore: number;
    improvements: string[];
    betterTitles: string[];
  };

  planner: PlannerResponse | null;

  contentStrategy: ContentStrategy | null;

  creatorWorkspace: unknown;
};