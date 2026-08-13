import {
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  CreatorWorkspaceData,
  Video,
  Channel,
  KeywordIntelligence,
  ViralPrediction,
  ThumbnailAnalysis,
  TitleAnalysis,
  SEOAnalysis,
  SEOOptimizer,
  ChannelAudit,
  ContentGap,
  MissedOpportunity,
  ContentStrategy,
  ContentPlanner,
  CreatorKit,
  AIThumbnail,
  Opportunity,
  OpportunityScoreV2,
} from "./types";

import type { PlannerResponse } from "../types/planner";

// ─────────────────────────────────────────────
// Saved Project
// ─────────────────────────────────────────────

export type SavedProject = {
  id: string;
  createdAt: number;
  updatedAt?: number;
  
  

  keyword: string;

  // Benchmark / Report
  latestReportId?: string;
  benchmarkScore?: number;
  opportunityScore?: number;
  lastBenchmarkAt?: number;

  // Research
  results?: Video[];
  topVideos?: Video[];
  channels?: Channel[];
  averageViews?: number;
    opportunityScoreV2?: OpportunityScoreV2;

  // Core AI
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  recommendedChannels: string;

  // Intelligence
  keywordIntelligence?: KeywordIntelligence;

  viralPrediction?: ViralPrediction;

  thumbnailAnalysis?: ThumbnailAnalysis;

  titleAnalysis?: TitleAnalysis;

  seoAnalysis?: SEOAnalysis | null;

  seoOptimizer?: SEOOptimizer | null;

  contentGap?: ContentGap[];

  channelAudit?: ChannelAudit | null;

  contentPlanner?: ContentPlanner[];

  aiThumbnail?: AIThumbnail[];

  opportunities?: Opportunity[];

  missedOpportunities?: MissedOpportunity[];

  // Strategy
  contentStrategy?: ContentStrategy | null;

  planner?: PlannerResponse | null;

  // Creator
  creatorKit?: CreatorKit | null;

  creatorWorkspace?: CreatorWorkspaceData;

  // Chat
  chatMessages?: {
    role: "user" | "assistant";
    content: string;
  }[];
};

// ─────────────────────────────────────────────
// Get Projects
// ─────────────────────────────────────────────

export async function getProjects(): Promise<SavedProject[]> {
  const res = await fetch("/api/projects", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load projects");
  }

  return res.json();
}

// ─────────────────────────────────────────────
// Create Project
// ─────────────────────────────────────────────

export async function saveProject(
  project: Omit<SavedProject, "id">
): Promise<SavedProject> {
  const res = await fetch("/api/projects", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(project),
  });

  if (!res.ok) {
    throw new Error("Failed to save project");
  }

  return res.json();
}

// ─────────────────────────────────────────────
// Update Project
// ─────────────────────────────────────────────

export async function updateProject(
  id: string,
  updates: Partial<Omit<SavedProject, "id" | "createdAt">>
): Promise<SavedProject> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  const data = await res.json();

  return data.project ?? data;
}

// ─────────────────────────────────────────────
// Get Single Project
// ─────────────────────────────────────────────

export async function getProject(
  id: string
): Promise<SavedProject> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load project");
  }

  return res.json();
}

// ─────────────────────────────────────────────
// Delete Project
// ─────────────────────────────────────────────

export async function deleteProject(
  id: string
): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}