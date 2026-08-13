"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "../lib/analytics";

import { validateSearch } from "./searchValidation";
import type {
  BenchmarkSearchResult,
} from "./useBenchmarkSearch";

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
  CreatorWorkspaceData,
  ThumbnailAnalysis,
  MissedOpportunity,
  KeywordIntelligence,
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

/* ============================================================
   HOOK OPTIONS
============================================================ */

type UseBenchmarkControllerOptions = {
  keyword: string;

  order: string;

  loading: boolean;

  language: string;

  user: {
  id: string;
} | null | undefined;

  creatorWorkspace: CreatorWorkspaceData;

  setError: (value: string) => void;

  setLoading: (value: boolean) => void;

  setLoadingStep: (value: string) => void;

  setLoadingProgress: (value: number) => void;

  setContentStrategy: (
    value: ContentStrategy | null
  ) => void;

  setMessages: (
    value: ChatMessage[]
  ) => void;

  setKeyword: (
    value: string
  ) => void;

  setAverageViews: (
    value: number
  ) => void;

  setResults: (
    value: Video[]
  ) => void;

  setTopVideos: (
    value: Video[]
  ) => void;

  setChannels: (
    value: Channel[]
  ) => void;

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

  setThumbnailPrompt: (
    value: ThumbnailPlan[]
  ) => void;

  setCreatorKit: (
    value: CreatorKit | null
  ) => void;

  setRecommendedChannels: (
    value: string
  ) => void;

  setOpportunities: (
    value: Opportunity[]
  ) => void;

  setKeywordIntelligence: (
    value: KeywordIntelligence
  ) => void;

  setViralPrediction: (
    value: ViralPrediction
  ) => void;

  setMissedOpportunities: (
    value: MissedOpportunity[]
  ) => void;

  setThumbnailAnalysis: (
    value: ThumbnailAnalysis
  ) => void;

  setTitleAnalysis: (
    value: TitleAnalysis
  ) => void;

  setPlanner: (
    value: PlannerResponse | null
  ) => void;

  setCreatorWorkspace: (
    value: CreatorWorkspaceData
  ) => void;

  runBenchmarkSearch: (options: {
    keyword: string;
    order: string;
    setLoading: (value: boolean) => void;
    setLoadingStep: (value: string) => void;
    setLoadingProgress: (value: number) => void;
  }) => Promise<BenchmarkSearchResult | null>;

  saveSearchHistory: (
    keyword: string
  ) => void;

  refreshUsage: () => Promise<void>;

  buildProjectData: (
    options?: BuildProjectDataOptions
  ) => Omit<
    import("../lib/projectStorage").SavedProject,
    "id"
  >;

  autoSaveProject: (
    projectData: Omit<
      import("../lib/projectStorage").SavedProject,
      "id"
    >
  ) => Promise<unknown>;

  buildViralPrediction: (
    intelligence: KeywordIntelligence
  ) => ViralPrediction;

  onSearchComplete?: () => void;
};

/* ============================================================
   HOOK
============================================================ */

export function useBenchmarkController({
  keyword,
  order,
  loading,
  language,
  user,
  creatorWorkspace,

  setError,

  setLoading,
  setLoadingStep,
  setLoadingProgress,

  setContentStrategy,
  setMessages,

  setAverageViews,
  setResults,
  setTopVideos,
  setChannels,

  setReport,
  setIdea,
  setStrategy,
  setCompetition,
  setTitles,

  setSeoAnalysis,
  setSeoOptimizer,
  setContentGap,
  setChannelAudit,
  setContentPlanner,
  setAIThumbnail,
  setThumbnailPrompt,
  setCreatorKit,
  setRecommendedChannels,
  setOpportunities,

  setKeywordIntelligence,
  setViralPrediction,

  setMissedOpportunities,
  setThumbnailAnalysis,
  setTitleAnalysis,

  setPlanner,
  setCreatorWorkspace,

  runBenchmarkSearch,
  saveSearchHistory,
  refreshUsage,
  buildProjectData,
  autoSaveProject,
  buildViralPrediction,

  onSearchComplete,
}: UseBenchmarkControllerOptions) {
  const router = useRouter();

  /* ==========================================================
     APPLY PROCESSED RESULTS
  ========================================================== */

  const applyProcessedResults = useCallback(
    (
      processed: BenchmarkSearchResult["processed"]
    ) => {
      setAverageViews(
        processed.averageViews
      );

      setResults(
        processed.results
      );

      setTopVideos(
        processed.topVideos
      );

      setChannels(
        processed.channels
      );
    },
    [
      setAverageViews,
      setResults,
      setTopVideos,
      setChannels,
    ]
  );

  /* ==========================================================
     APPLY AI RESULTS
  ========================================================== */

  const applyAIResults = useCallback(
    (
      ai: BenchmarkSearchResult["ai"]
    ) => {
      setReport(
        ai.report
      );

      setIdea(
        ai.idea
      );

      setStrategy(
        ai.strategy
      );

      setCompetition(
        ai.competition
      );

      setTitles(
        ai.titles
      );

      setSeoAnalysis(
        ai.seo
      );

      setSeoOptimizer(
        ai.seoOptimizer
      );

      setContentGap(
        ai.contentGap
      );

      setChannelAudit(
        ai.channelAudit
      );

      setContentPlanner(
        ai.contentPlanner
      );

      setAIThumbnail(
        ai.aiThumbnail
      );

      setThumbnailPrompt(
        ai.thumbnail
      );

      setCreatorKit(
        ai.creatorKit
      );

      setRecommendedChannels(
        ai.recommendedChannels
      );

      setOpportunities(
        ai.opportunities
      );
    },
    [
      setReport,
      setIdea,
      setStrategy,
      setCompetition,
      setTitles,
      setSeoAnalysis,
      setSeoOptimizer,
      setContentGap,
      setChannelAudit,
      setContentPlanner,
      setAIThumbnail,
      setThumbnailPrompt,
      setCreatorKit,
      setRecommendedChannels,
      setOpportunities,
    ]
  );

  /* ==========================================================
     MAIN SEARCH CONTROLLER
  ========================================================== */

  const handleSearch = useCallback(
    async (
      searchOrder = order,
      searchKeyword = keyword
    ) => {
      const normalizedKeyword =
        searchKeyword.trim();

      /* ======================================================
         BASIC GUARDS
      ====================================================== */

      if (loading) {
        return;
      }

      if (!normalizedKeyword) {
        setError(
          language === "ko"
            ? "분석할 키워드를 입력해주세요."
            : "Please enter a keyword to analyze."
        );

        return;
      }

      /* ======================================================
         SEARCH VALIDATION
      ====================================================== */

      const canSearch =
        validateSearch({
          keyword:
            normalizedKeyword,
          user,
          router,
        });

      if (!canSearch) {
        return;
      }

      try {
        /* ====================================================
           RESET TEMPORARY STATE
        ==================================================== */

        setError("");

        setContentStrategy(
          null
        );

        setMessages([]);

        void trackEvent("search_start", {
  keyword: normalizedKeyword,
  metadata: {
    order: searchOrder,
  },
});

        /* ====================================================
           RUN BENCHMARK PIPELINE
        ==================================================== */

        const searchResult =
          await runBenchmarkSearch({
            keyword:
              normalizedKeyword,

            order:
              searchOrder,

            setLoading,
            setLoadingStep,
            setLoadingProgress,
          });

        if (!searchResult) {
          return;
        }
void trackEvent("analysis_complete", {
  keyword: normalizedKeyword,

  metadata: {
    resultCount:
      searchResult.processed.results.length,

    benchmarkScore:
      searchResult.ai.report?.score ?? 0,

    opportunity:
      searchResult.ai.keywordIntelligence
        ?.opportunity ?? 0,

    difficulty:
      searchResult.ai.keywordIntelligence
        ?.difficulty ?? 0,

    confidence:
      searchResult.ai.keywordIntelligence
        ?.confidence ?? 0,
  },
});

        const {
          processed,
          ai,
          missedOpportunities,
          thumbnailAnalysis,
          titleAnalysis,
          planner,
          contentStrategy,
          creatorWorkspace:
            generatedWorkspace,
        } = searchResult;

        /* ====================================================
           1. SEARCH HISTORY
        ==================================================== */

        saveSearchHistory(
          normalizedKeyword
        );

        /* ====================================================
           2. BENCHMARK RESULTS
        ==================================================== */

        applyProcessedResults(
          processed
        );

        /* ====================================================
           3. AI RESULTS
        ==================================================== */

        applyAIResults(
          ai
        );

        /* ====================================================
           4. KEYWORD INTELLIGENCE
        ==================================================== */

        const keywordData =
          ai.keywordIntelligence;

        if (keywordData) {
          setKeywordIntelligence(
            keywordData
          );

          setViralPrediction(
            buildViralPrediction(
              keywordData
            )
          );
        }

        /* ====================================================
           5. ADDITIONAL ANALYSIS
        ==================================================== */

        setMissedOpportunities(
          missedOpportunities
        );

        setThumbnailAnalysis(
          thumbnailAnalysis
        );

        setTitleAnalysis(
          titleAnalysis
        );

        setPlanner(
          planner
        );

        setContentStrategy(
          contentStrategy
        );

        if (
          generatedWorkspace
        ) {
          setCreatorWorkspace(
            generatedWorkspace
          );
        }

        /* ====================================================
           6. REFRESH USAGE
        ==================================================== */

        await refreshUsage();

        /* ====================================================
           7. SCROLL TO DASHBOARD
        ==================================================== */

        window.setTimeout(
          () => {
            onSearchComplete?.();
          },
          300
        );

        /* ====================================================
           8. AUTO SAVE
        ==================================================== */

        if (user) {
          try {
            const projectData =
              buildProjectData({
                targetKeyword:
                  normalizedKeyword,

                processedOverride:
                  processed,

                aiOverride: {
                  report:
                    ai.report,

                  idea:
                    ai.idea,

                  strategy:
                    ai.strategy,

                  competition:
                    ai.competition,

                  titles:
                    ai.titles,

                  seoAnalysis:
                    ai.seo,

                  seoOptimizer:
                    ai.seoOptimizer,

                  contentGap:
                    ai.contentGap,

                  channelAudit:
                    ai.channelAudit,

                  contentPlanner:
                    ai.contentPlanner,

                  aiThumbnail:
                    ai.aiThumbnail,

                  creatorKit:
                    ai.creatorKit,

                  opportunities:
                    ai.opportunities,

                  recommendedChannels:
                    ai.recommendedChannels,
                },

                missedOpportunitiesOverride:
                  missedOpportunities,

                thumbnailAnalysisOverride:
                  thumbnailAnalysis,

                titleAnalysisOverride:
                  titleAnalysis,

                contentStrategyOverride:
                  contentStrategy,

                plannerOverride:
                  planner,

                workspaceOverride:
                  generatedWorkspace ??
                  creatorWorkspace,
              });

            await autoSaveProject(
              projectData
            );
          } catch (
            autoSaveError
          ) {
            console.error(
              "Auto Save failed:",
              autoSaveError
            );
          }
        }
      } catch (searchError) {
        console.error(
          "Benchmark search failed:",
          searchError
        );

        /* ====================================================
           UPGRADE REQUIRED
        ==================================================== */

        if (
          searchError instanceof Error &&
          searchError.message ===
            "UPGRADE_REQUIRED"
        ) {
          router.push(
            "/pricing"
          );

          return;
        }

        /* ====================================================
           GENERAL ERROR
        ==================================================== */

        setError(
          language === "ko"
            ? "키워드를 분석하는 중 오류가 발생했습니다. 다시 시도해주세요."
            : "Something went wrong while analyzing this keyword. Please try again."
        );
      }
    },
    [
      order,
      keyword,
      loading,
      language,
      user,
      creatorWorkspace,

      setError,

      setLoading,
      setLoadingStep,
      setLoadingProgress,

      setContentStrategy,
      setMessages,

      applyProcessedResults,
      applyAIResults,

      setKeywordIntelligence,
      setViralPrediction,

      setMissedOpportunities,
      setThumbnailAnalysis,
      setTitleAnalysis,

      setPlanner,
      setCreatorWorkspace,

      runBenchmarkSearch,
      saveSearchHistory,
      refreshUsage,
      buildProjectData,
      autoSaveProject,
      buildViralPrediction,

      onSearchComplete,
    ]
  );

  /* ==========================================================
     SEARCH STATE HELPER
  ========================================================== */

  const runSearchWithNextState =
    useCallback(
      (
        callback: () => void
      ) => {
        callback();

        window.setTimeout(
          () => {
            void handleSearch(
              order,
              keyword
            );
          },
          0
        );
      },
      [
        handleSearch,
        order,
        keyword,
      ]
    );

  /* ==========================================================
     PUBLIC API
  ========================================================== */

  return {
    handleSearch,
    runSearchWithNextState,
  };
}