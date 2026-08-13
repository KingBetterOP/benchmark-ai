export type GrowthPlanCategory =
  | "title"
  | "thumbnail"
  | "hook"
  | "seo"
  | "content";

export type GrowthPlanPriority =
  | "HIGH"
  | "MEDIUM"
  | "LOW";

export type GrowthPlanAction = {
  id: string;
  category: GrowthPlanCategory;
  priority: GrowthPlanPriority;
  impact: number;
  title: string;
  problem: string;
  recommendation: string;
  action: string;
};

export type GrowthPlanResponse = {
  success: boolean;
  keyword: string;
  expectedViews: number | null;

  overallScore: number;

  growthPotential:
    | "HIGH"
    | "MEDIUM"
    | "LOW";

  summary: string;

  actions: GrowthPlanAction[];

  error?: string;
};

export type GrowthPlanRequest = {
  keyword?: string;

  benchmarkScore?: number;
  opportunityScore?: number;
  thumbnailScore?: number;
  titleScore?: number;
  seoScore?: number;
  contentGap?: number;

  expectedViews?: number | null;
};