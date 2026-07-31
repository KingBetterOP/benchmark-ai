import {
  BenchmarkReport,
  TitleSuggestion,
  ThumbnailPlan,
  CompetitionAnalysis,
  ContentIdea,
  Strategy,
} from "../types";

export type WorkflowStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";

export type WorkflowStep =
  | "research"
  | "competition"
  | "titles"
  | "thumbnail"
  | "script"
  | "seo"
  | "publish";

export interface WorkflowProgress {
  step: WorkflowStep;
  status: WorkflowStatus;
  progress: number;
}

export interface WorkflowResult {
  report: BenchmarkReport | null;

  competition: CompetitionAnalysis | null;

  ideas: ContentIdea[];

  strategy: Strategy[];

  titles: TitleSuggestion[];

  thumbnails: ThumbnailPlan[];

  script: string;

  description: string;

  tags: string[];

  uploadTime: string;

  checklist: string[];
}