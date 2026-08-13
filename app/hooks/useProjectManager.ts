"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";

import {
  saveProject,
  updateProject,
  getProjects,
  deleteProject,
} from "../lib/projectStorage";

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
  ThumbnailPlan,
  ThumbnailAnalysis,
  Opportunity,
  MissedOpportunity,
  CreatorKit,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ContentStrategy,
  CreatorWorkspaceData,
} from "../lib/types";

import type { PlannerResponse } from "../types/planner";

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



export type BuildProjectDataOptions = {
  targetKeyword?: string;

  workspaceOverride?: CreatorWorkspaceData;

  processedOverride?: Partial<
    Pick<
      SavedProject,
      "results" | "topVideos" | "channels" | "averageViews"
    >
  >;

  aiOverride?: Partial<
    Pick<
      SavedProject,
      | "report"
      | "idea"
      | "strategy"
      | "competition"
      | "titles"
      | "recommendedChannels"
      | "seoAnalysis"
      | "seoOptimizer"
      | "contentGap"
      | "channelAudit"
      | "contentPlanner"
      | "aiThumbnail"
      | "creatorKit"
      | "opportunities"
    >
  >;

  missedOpportunitiesOverride?: MissedOpportunity[];

  thumbnailAnalysisOverride?: ThumbnailAnalysis;

  titleAnalysisOverride?: TitleAnalysis;

  contentStrategyOverride?: ContentStrategy | null;

  plannerOverride?: PlannerResponse | null;
};

type BuildProjectData = (
  options?: BuildProjectDataOptions
) => Omit<SavedProject, "id">;

type UseProjectManagerProps = {
  language: string;

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

  setKeyword: (value: string) => void;
  setResults: (value: Video[]) => void;
  setTopVideos: (value: Video[]) => void;
  setChannels: (value: Channel[]) => void;
  setAverageViews: (value: number) => void;

  setReport: (
    value: BenchmarkReport | null
  ) => void;

  setIdea: (
    value: ContentIdea[]
  ) => void;

  setStrategy: (
    value: Strategy[]
  ) => void;

  setCompetition: (
    value: CompetitionAnalysis | null
  ) => void;

  setTitles: (
    value: TitleSuggestion[]
  ) => void;

  setRecommendedChannels: (
    value: string
  ) => void;

  setKeywordIntelligence: (
    value: KeywordIntelligence
  ) => void;

  setViralPrediction: (
    value: ViralPrediction
  ) => void;

  setThumbnailAnalysis: (
    value: ThumbnailAnalysis
  ) => void;

  setTitleAnalysis: (
    value: TitleAnalysis
  ) => void;

  setSeoAnalysis: (
    value: SEOAnalysis | null
  ) => void;

  setSeoOptimizer: (
    value: SEOOptimizer | null
  ) => void;

  setContentGap: (
    value: ContentGap[]
  ) => void;

  setChannelAudit: (
    value: ChannelAudit | null
  ) => void;

  setContentPlanner: (
    value: ContentPlanner[]
  ) => void;

  setAIThumbnail: (
    value: AIThumbnail[]
  ) => void;

  setOpportunities: (
  value: Opportunity[]
  ) => void;

  setMissedOpportunities: (
    value: MissedOpportunity[]
  ) => void;

  setContentStrategy: (
    value: ContentStrategy | null
  ) => void;

  setPlanner: (
    value: PlannerResponse | null
  ) => void;

  setCreatorKit: (
    value: CreatorKit | null
  ) => void;

  setCreatorWorkspace: (
    value: CreatorWorkspaceData
  ) => void;

  setMessages: (
    value: ChatMessage[]
  ) => void;

  setError: (
    value: string
  ) => void;

  buildProjectData: BuildProjectData;

  onProjectLoaded?: () => void;
};

const DEFAULT_KEYWORD_INTELLIGENCE: KeywordIntelligence = {
  difficulty: 0,
  opportunity: 0,
  trend: "",
  demand: "",
  uploadTime: "",
  audience: "",
  expectedViews: "",
  expectedCTR: "",
  estimatedRPM: "",
  estimatedRevenue: "",
  recommendation: "",
  confidence: 0,
};

const DEFAULT_VIRAL_PREDICTION: ViralPrediction = {
  successProbability: 0,
  expectedViews: "-",
  expectedCTR: "-",
  estimatedRPM: "-",
  estimatedRevenue: "-",
  competition: "-",
  recommendation: "-",
  confidence: 0,
};

const DEFAULT_THUMBNAIL_ANALYSIS: ThumbnailAnalysis = {
  ctrScore: 0,
  emotionScore: 0,
  colorScore: 0,
  textScore: 0,
  overallScore: 0,
  strengths: [],
  improvements: [],
};

const DEFAULT_TITLE_ANALYSIS: TitleAnalysis = {
  ctrScore: 0,
  seoScore: 0,
  emotionScore: 0,
  curiosityScore: 0,
  lengthScore: 0,
  overallScore: 0,
  improvements: [],
  betterTitles: [],
};

const DEFAULT_CREATOR_WORKSPACE: CreatorWorkspaceData = {
  titles: [],
  hook: "",
  script: "",
  description: "",
  hashtags: [],
  thumbnailPrompt: "",

  uploadStrategy: "",
  uploadTime: "",
  targetAudience: "",

  seoKeywords: [],

  pinnedComment: "",
  communityPost: "",

  viralScore: 0,

  callToAction: "",
  shortsScript: "",
  instagramCaption: "",
  twitterPost: "",
};

export function useProjectManager({
  language,

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

  setKeyword,
  setResults,
  setTopVideos,
  setChannels,
  setAverageViews,

  setReport,
  setIdea,
  setStrategy,
  setCompetition,
  setTitles,
  setRecommendedChannels,

  setKeywordIntelligence,
  setViralPrediction,

  setThumbnailAnalysis,
  setTitleAnalysis,

  setSeoAnalysis,
  setSeoOptimizer,
  setContentGap,
  setChannelAudit,
  setContentPlanner,
  setAIThumbnail,
  setOpportunities,
  setMissedOpportunities,

  setContentStrategy,
  setPlanner,

  setCreatorKit,
  setCreatorWorkspace,

  setMessages,

  setError,

  buildProjectData,

  onProjectLoaded,
}: UseProjectManagerProps) {
  const { user } = useUser();

  const [projects, setProjects] = useState<
    SavedProject[]
  >([]);

  const [currentProjectId, setCurrentProjectId] =
    useState<string | null>(null);

  const [projectLoading, setProjectLoading] =
    useState(false);

  /*
  ============================================================
  LOAD PROJECTS
  ============================================================
  */

  const reloadProjects = useCallback(
  async () => {
    if (!user) {
      setProjects([]);
      return;
    }

    try {
      setProjectLoading(true);

      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );
    } finally {
      setProjectLoading(false);
    }
  },
  [user]
);

/*
============================================================
LOAD PROJECTS WHEN USER CHANGES
============================================================
*/

useEffect(() => {
  if (!user) {
    setProjects([]);
    setCurrentProjectId(null);
    return;
  }

  reloadProjects();
}, [user, reloadProjects]);

/*
============================================================
SAVE PROJECT
============================================================
*/

  const handleSaveProject = async () => {
    if (!user) {
      alert(
        language === "ko"
          ? "로그인이 필요합니다."
          : "Please sign in."
      );

      return;
    }

    if (!keyword.trim()) {
      alert(
        language === "ko"
          ? "검색어를 먼저 입력해주세요."
          : "Please enter a keyword first."
      );

      return;
    }

    if (results.length === 0) {
      alert(
        language === "ko"
          ? "저장할 분석 결과가 없습니다."
          : "There are no analysis results to save."
      );

      return;
    }

    try {
      setProjectLoading(true);

      const projectData =
  buildProjectData({
    targetKeyword: keyword,
    workspaceOverride: creatorWorkspace,
  });

      const created =
        await saveProject(
          projectData
        );

      if (created?.id) {
        setCurrentProjectId(
          created.id
        );
      }

      await reloadProjects();

      alert(
        language === "ko"
          ? "프로젝트가 저장되었습니다."
          : "Project saved."
      );
    } catch (error) {
      console.error(
        "Failed to save project:",
        error
      );

      alert(
        language === "ko"
          ? "저장 실패"
          : "Failed to save project."
      );
    } finally {
      setProjectLoading(false);
    }
  };

  

  /*
============================================================
AUTO SAVE
============================================================
*/

const autoSaveProject = async (
  projectData: Omit<SavedProject, "id">
) => {
  if (!user) {
    return null;
  }

  try {
    let savedProject: SavedProject | null = null;
    let projectId = currentProjectId;

    /*
    ============================================================
    1. SAVE / UPDATE PROJECT
    ============================================================
    */

    if (currentProjectId) {
      const updated = await updateProject(
        currentProjectId,
        projectData
      );

      savedProject = updated;
      projectId = updated.id;
    } else {
      const created = await saveProject(
        projectData
      );

      if (created?.id) {
        setCurrentProjectId(created.id);

        projectId = created.id;
        savedProject = created;
      }
    }

    /*
    ============================================================
    2. CREATE REPORT
    ============================================================
    */

    if (projectId) {
      const reportResponse = await fetch(
        "/api/reports",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            projectId,

            keyword:
              projectData.keyword,

            benchmarkResult:
              projectData,

            report:
              projectData.report ?? null,

            benchmarkScore:
              projectData.report?.score ??
              0,

            opportunity:
              projectData
                .keywordIntelligence
                ?.opportunity ??
              0,

            opportunityScoreV2:
  projectData.opportunityScoreV2 ?? {
    total: 0,
    confidence: 0,
    verdict: "WAIT",
    demand: 0,
    competition: 0,
    trend: 0,
    ctr: 0,
    thumbnail: 0,
    title: 0,
    freshness: 0,
    gap: 0,
  },

            competition:
              projectData
                .viralPrediction
                ?.competition ??
              "Unknown",

            expectedViews:
              projectData
                .viralPrediction
                ?.expectedViews ??
              "Unknown",

            uploadTime:
              projectData
                .creatorWorkspace
                ?.uploadTime ??
              "Unknown",

            titles:
              projectData.titles ?? [],
          }),
        }
      );

      if (!reportResponse.ok) {
        const errorData =
          await reportResponse
            .json()
            .catch(() => null);

        throw new Error(
          errorData?.error ??
            "Failed to create report"
        );
      }

      const reportData =
        await reportResponse.json();

      /*
      ==========================================================
      3. STORE LATEST REPORT ID
      ==========================================================
      */

      if (reportData?.id) {
        savedProject = {
          ...(savedProject ??
            ({} as SavedProject)),

          latestReportId:
            reportData.id,
        } as SavedProject;
      }
    }

    /*
    ============================================================
    4. REFRESH PROJECT LIST
    ============================================================
    */

    await reloadProjects();

    return savedProject;
  } catch (error) {
    console.error(
      "Auto Save failed:",
      error
    );

    return null;
  }
};

  /*
  ============================================================
  LOAD PROJECT
  ============================================================
  */

  const handleLoadProject = (
    project: SavedProject
  ) => {
    setCurrentProjectId(
      project.id
    );

    /*
    ============================================================
    RESEARCH
    ============================================================
    */

    setKeyword(
      project.keyword ?? ""
    );

    setResults(
      project.results ?? []
    );

    setTopVideos(
      project.topVideos ?? []
    );

    setChannels(
      project.channels ?? []
    );

    setAverageViews(
      project.averageViews ?? 0
    );

    /*
    ============================================================
    CORE AI
    ============================================================
    */

    setReport(
      project.report ?? null
    );

    setIdea(
      project.idea ?? []
    );

    setStrategy(
      project.strategy ?? []
    );

    setCompetition(
      project.competition ?? null
    );

    setTitles(
      project.titles ?? []
    );

    setRecommendedChannels(
      project.recommendedChannels ?? ""
    );

    /*
    ============================================================
    INTELLIGENCE
    ============================================================
    */

    setKeywordIntelligence(
      project.keywordIntelligence ??
        DEFAULT_KEYWORD_INTELLIGENCE
    );

    setViralPrediction(
      project.viralPrediction ??
        DEFAULT_VIRAL_PREDICTION
    );

    setThumbnailAnalysis(
      project.thumbnailAnalysis ??
        DEFAULT_THUMBNAIL_ANALYSIS
    );

    setTitleAnalysis(
      project.titleAnalysis ??
        DEFAULT_TITLE_ANALYSIS
    );

    setSeoAnalysis(
      project.seoAnalysis ?? null
    );

    setSeoOptimizer(
      project.seoOptimizer ?? null
    );

    setContentGap(
      project.contentGap ?? []
    );

    setChannelAudit(
      project.channelAudit ?? null
    );

    setContentPlanner(
      project.contentPlanner ?? []
    );

    setAIThumbnail(
      project.aiThumbnail ?? []
    );

    setOpportunities(
      project.opportunities ?? []
    );

    setMissedOpportunities(
      project.missedOpportunities ?? []
    );

    /*
    ============================================================
    STRATEGY
    ============================================================
    */

    setContentStrategy(
      project.contentStrategy ?? null
    );

    setPlanner(
      project.planner ?? null
    );

    /*
    ============================================================
    CREATOR
    ============================================================
    */

    setCreatorKit(
      project.creatorKit ?? null
    );

    setCreatorWorkspace(
      project.creatorWorkspace ??
        DEFAULT_CREATOR_WORKSPACE
    );

    /*
    ============================================================
    CHAT
    ============================================================
    */

    setMessages(
      project.chatMessages ?? []
    );

    /*
    ============================================================
    UI
    ============================================================
    */

    setError("");

    onProjectLoaded?.();
  };

  /*
  ============================================================
  DELETE PROJECT
  ============================================================
  */

  const handleDeleteProject = async (
    id: string
  ) => {
    if (!user) {
      return;
    }

    try {
      setProjectLoading(true);

      await deleteProject(id);

      if (currentProjectId === id) {
        setCurrentProjectId(null);
      }

      await reloadProjects();
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error
      );
    } finally {
      setProjectLoading(false);
    }
  };

  return {
    projects,
    currentProjectId,
    setCurrentProjectId,

    projectLoading,

    reloadProjects,

    handleSaveProject,
    handleLoadProject,
    handleDeleteProject,

    autoSaveProject,
  };
}