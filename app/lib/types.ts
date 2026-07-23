export interface Thumbnail {
  url: string;
}

export interface VideoSnippet {
  title: string;
  channelTitle: string;
  publishedAt: string;
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