/* =========================================================
   YOUTUBE CORE TYPES
========================================================= */

export interface Thumbnail {
  url: string;
}

export interface VideoSnippet {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  channelId: string;

  thumbnails: {
    high: Thumbnail;
  };
}

export interface VideoStatistics {
  viewCount: string;
  likeCount?: string;
  commentCount?: string;
}

export interface VideoContentDetails {
  duration: string;
}

export interface VideoChannel {
  name: string;
  thumbnail: string;
  subscribers: number;
}

export interface Channel {
  name: string;
  thumbnail: string;
  subscribers: number;
  videos: number;
  views: number;
}

export interface Video {
  id: string;

  snippet: VideoSnippet;

  statistics: VideoStatistics;

  contentDetails: VideoContentDetails;

  channel?: Channel;

  benchmarkScore?: number;
}


/* =========================================================
   BENCHMARK REPORT
========================================================= */

export interface BenchmarkReport {
  score: number;

  overview: {
    avgViews: string;
    avgDuration: string;
    uploadFrequency: string;
    bestVideo: string;
  };

  insights: string[];

  actionPlan: string[];

  analysis: string;

  prediction: {
    successProbability: number;
    expectedViews: string;
    expectedCTR: string;
    expectedRPM: string;
    estimatedRevenue: string;
  };

  seo: {
    score: number;
    titleScore: number;
    keywordScore: number;
    descriptionScore: number;
  };

  audience: {
    retention: number;
    engagement: number;
    target: string;
  };

  uploadStrategy: {
    bestDay: string;
    bestTime: string;
    recommendedLength: string;
  };

  risk: {
    level: string;
    reasons: string[];
  };
}


/* =========================================================
   CONTENT IDEAS
========================================================= */

export interface ContentIdea {
  title: string;

  expectedViews: string;

  difficulty: string;

  trendScore: number;

  reason: string;

  thumbnail: string;
}


/* =========================================================
   CONTENT STRATEGY
========================================================= */

export interface Strategy {
  title: string;

  impact: number;

  difficulty: string;

  description: string;
}

export type ContentStrategy = {
  angle: string;

  format: string;

  length: string;

  hook: string;

  structure: string[];

  cta: string;

  reasoning: string;
};


/* =========================================================
   COMPETITION
========================================================= */

export interface CompetitionAnalysis {
  competitionScore: number;

  difficulty: string;

  successProbability: number;

  recommendation: string;

  strengths: string[];

  weaknesses: string[];

  marketSaturation: string;

  barrierToEntry: string;

  contentQuality: number;

  thumbnailQuality: number;

  titleQuality: number;

  uploadFrequency: string;

  opportunityScore: number;

  opportunities: string[];
}


/* =========================================================
   TITLE INTELLIGENCE
========================================================= */

export interface TitleSuggestion {
  title: string;

  ctr: number;

  seo: number;

  emotion: number;
}

export interface TitleAnalysis {
  ctrScore: number;

  seoScore: number;

  emotionScore: number;

  curiosityScore: number;

  lengthScore: number;

  overallScore: number;

  improvements: string[];

  betterTitles: string[];
}


/* =========================================================
   THUMBNAIL INTELLIGENCE
========================================================= */

export interface ThumbnailPlan {
  background: string;

  expression: string;

  text: string;

  color: string;

  reason: string;
}

export interface AIThumbnail {
  prompt: string;

  style: string;

  text: string;

  colors: string[];

  composition: string;

  emotion: string;
}

export interface ThumbnailAnalysis {
  ctrScore: number;

  emotionScore: number;

  colorScore: number;

  textScore: number;

  overallScore: number;

  strengths: string[];

  improvements: string[];
}


/* =========================================================
   OPPORTUNITY
========================================================= */

export interface Opportunity {
  keyword: string;

  competition: string;

  growth: string;

  expectedViews: string;

  reason: string;
}

export interface MissedOpportunity {
  title: string;

  reason: string;
}


/* =========================================================
   SEO
========================================================= */

export interface SEOOptimizer {
  betterTitle: string;

  betterDescription: string;

  tags: string[];

  keywordCluster: string[];

  searchIntent: string;

  rankingTips: string[];
}

export interface SEOAnalysis {
  overallScore: number;

  titleScore: number;

  descriptionScore: number;

  keywordDensity: number;

  rankingProbability: number;

  recommendedKeywords: string[];

  missingKeywords: string[];

  suggestions: string[];
}


/* =========================================================
   KEYWORD INTELLIGENCE
========================================================= */

export interface KeywordIntelligence {
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
}


/* =========================================================
   CHANNEL AUDIT
========================================================= */

export interface ChannelAudit {
  overallScore: number;

  niche: string;

  uploadFrequency: string;

  titleStyle: string;

  thumbnailStyle: string;

  strengths: string[];

  weaknesses: string[];

  opportunities: string[];

  estimatedCTR: string;

  estimatedRPM: string;

  growthPotential: string;

  recommendation: string;
}


/* =========================================================
   CONTENT GAP
========================================================= */

export type ContentGap = {
  keyword: string;

  opportunityScore: number;

  competition: string;

  reason: string;

  estimatedViews: string;

  contentIdea: string;
};


/* =========================================================
   CONTENT PLANNER
========================================================= */

export interface ContentPlanner {
  day: number;

  title: string;

  goal: string;

  targetViews: string;

  difficulty: string;

  reason: string;
}


/* =========================================================
   CREATOR KIT
========================================================= */

export interface CreatorKit {
  hook: string;

  script: string;

  description: string;

  hashtags: string[];

  thumbnailPrompt: string;

  callToAction: string;

  communityPost: string;

  shortsScript: string;

  instagramCaption: string;

  twitterPost: string;
}


/* =========================================================
   VIRAL PREDICTION
========================================================= */

export interface ViralPrediction {
  successProbability: number;

  expectedViews: string;

  expectedCTR: string;

  estimatedRPM: string;

  estimatedRevenue: string;

  competition: string;

  recommendation: string;

  confidence: number;
}


/* =========================================================
   DECISION ENGINE
========================================================= */

export interface FinalDecision {
  score: number;

  decision: string;

  reasons: string[];

  action: string;
}

export interface DecisionEngine {
  overallScore: number;

  confidence: number;

  decision: "make" | "wait" | "skip";

  market: {
    demand: number;

    competition: number;

    trend: number;
  };

  performance: {
    ctr: number;

    rpm: number;

    retention: number;
  };

  risk: {
    level: "Low" | "Medium" | "High";

    reasons: string[];
  };

  reasons: string[];

  actions: string[];
}


/* =========================================================
   CREATOR WORKSPACE
========================================================= */

export interface CreatorWorkspaceData {
  titles: string[];

  hook: string;

  script: string;

  description: string;

  hashtags: string[];

  thumbnailPrompt: string;

  uploadStrategy: string;

  uploadTime: string;

  targetAudience: string;

  seoKeywords: string[];

  pinnedComment: string;

  communityPost: string;

  viralScore: number;

  callToAction: string;

  shortsScript: string;

  instagramCaption: string;

  twitterPost: string;
}


/* =========================================================
   AI MODULE STATUS
========================================================= */

export interface AIModuleStatus {
  name: string;

  success: boolean;

  error?: string;

  durationMs?: number;
}


/* =========================================================
   AI META
========================================================= */

export interface AIMeta {
  successfulModules: number;

  failedModules: number;

  totalModules: number;

  processingTimeMs?: number;

  modules?: AIModuleStatus[];
}


/* =========================================================
   COMPLETE AI RESULT
========================================================= */

export interface AIAnalysisResult {
  meta: AIMeta;

  report: BenchmarkReport;

  idea: ContentIdea[];

  strategy: Strategy[];

  competition: CompetitionAnalysis;

  titles: TitleSuggestion[];

  seo: SEOAnalysis;

  seoOptimizer: SEOOptimizer;

  contentGap: ContentGap[];

  channelAudit: ChannelAudit;

  contentPlanner: ContentPlanner[];

  aiThumbnail: AIThumbnail[];

  recommendedChannels: string;

  opportunities: Opportunity[];

  thumbnail: ThumbnailPlan[];

  creatorKit: CreatorKit;

  keywordIntelligence: KeywordIntelligence;

  viralPrediction?: ViralPrediction;

  thumbnailAnalysis?: ThumbnailAnalysis;

  titleAnalysis?: TitleAnalysis;

  finalDecision?: FinalDecision;

  decisionEngine?: DecisionEngine;

  contentStrategy?: ContentStrategy;

  creatorWorkspace?: CreatorWorkspaceData;

  missedOpportunities?: MissedOpportunity[];
}

/* =========================================================
   PROCESSED VIDEO DATA
========================================================= */

export interface ProcessedBenchmarkData {
  results: Video[];

  averageViews: number;

  topVideos: Video[];

  channels: Channel[];
}


/* =========================================================
   OPPORTUNITY SCORE V2
========================================================= */

export interface OpportunityScoreV2 {
  total: number;

  confidence: number;

  verdict: "MAKE" | "WAIT" | "AVOID";

  demand: number;
  competition: number;
  trend: number;
  ctr: number;
  thumbnail: number;
  title: number;
  freshness: number;
  gap: number;

  trendEngine?: {
    recentUploads?: number;
    averageAge?: number;
  };

  gapEngine?: {
    opportunity?: string | number;
  };

  level?: string;
  growth?: number;
  contentGap?: number;
  reasons?: string[];
  opportunities?: string[];
  recommendation?: string;
}


/* =========================================================
   BENCHMARK FILTERS
========================================================= */

export interface BenchmarkFilters {
  excludeShorts: boolean;

  min10Minutes: boolean;

  last30Days: boolean;
}


/* =========================================================
   BENCHMARK SERVICE META
========================================================= */

export interface BenchmarkServiceMeta {
  keyword: string;

  order: string;

  language: string;

  filters: BenchmarkFilters;

  processingTimeMs: number;
}


/* =========================================================
   FINAL BENCHMARK RESULT
========================================================= */

export interface BenchmarkResult {
  meta: BenchmarkServiceMeta;

  processed: ProcessedBenchmarkData;

  opportunityScoreV2: OpportunityScoreV2;

  ai: AIAnalysisResult;
}