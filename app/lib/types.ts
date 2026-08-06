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

export interface Video {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
  contentDetails: VideoContentDetails;
  channel?: Channel;
}


export interface Channel {
  name: string;
  thumbnail: string;
  subscribers: number;
  videos: number;
  views: number;
}
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

export interface ContentIdea {
  title: string;
  expectedViews: string;
  difficulty: string;
  trendScore: number;
  reason: string;
  thumbnail: string;
}

export interface Strategy {
  title: string;
  impact: number;
  difficulty: string;
  description: string;
}

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

export interface TitleSuggestion {
  title: string;
  ctr: number;
  seo: number;
  emotion: number;
}

export interface ThumbnailPlan {
  background: string;
  expression: string;
  text: string;
  color: string;
  reason: string;
}
export interface Opportunity {
  keyword: string;
  competition: string;
  growth: string;
  expectedViews: string;
  reason: string;
}
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
export interface SEOOptimizer {
  betterTitle: string;

  betterDescription: string;

  tags: string[];

  keywordCluster: string[];

  searchIntent: string;

  rankingTips: string[];
}
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
export type ContentGap = {
  keyword: string;

  opportunityScore: number;

  competition: string;

  reason: string;

  estimatedViews: string;

  contentIdea: string;
};
export interface ContentPlanner {
  day: number;

  title: string;

  goal: string;

  targetViews: string;

  difficulty: string;

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
export interface FinalDecision {
  score: number;
  decision: string;
  reasons: string[];
  action: string;
}

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

export interface ThumbnailAnalysis {
  ctrScore: number;
  emotionScore: number;
  colorScore: number;
  textScore: number;
  overallScore: number;
  strengths: string[];
  improvements: string[];
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
export interface MissedOpportunity {
  title: string;
  reason: string;
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