"use client";

import { useCallback } from "react";

import { executeBenchmarkSearch } from "./useSearch";

import {
  startLoading,
  finishLoading,
} from "./loadingState";

import { calculateOpportunityScoreV2 } from "../lib/opportunityScoreV2";
import { calculateFinalDecision } from "../lib/finalDecision";

import type { PlannerResponse } from "../types/planner";

import type {
  Video,
  Channel,
  BenchmarkReport,
  ContentStrategy,
  MissedOpportunity,
  ThumbnailAnalysis,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ThumbnailPlan,
  CreatorKit,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  Opportunity,
  KeywordIntelligence,
} from "../lib/types";

/* ============================================================
   PROCESSED SEARCH RESULT
============================================================ */

type ProcessedSearchResult = {
  averageViews: number;
  results: Video[];
  topVideos: Video[];
  channels: Channel[];
};

/* ============================================================
   AI SEARCH RESULT
============================================================ */

type AISearchResult = {
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

  keywordIntelligence: KeywordIntelligence;
};

/* ============================================================
   PUBLIC RESULT TYPE
============================================================ */

export type BenchmarkSearchResult = {
  processed: ProcessedSearchResult;

  ai: AISearchResult;

  missedOpportunities: MissedOpportunity[];

  thumbnailAnalysis: ThumbnailAnalysis;

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

  creatorWorkspace: null;
};

/* ============================================================
   HOOK OPTIONS
============================================================ */

type UseBenchmarkSearchOptions = {
  language: string;

  excludeShorts: boolean;

  min10Minutes: boolean;

  last30Days: boolean;

  setError: (error: string) => void;
};

/* ============================================================
   DEFAULT ANALYSIS
============================================================ */

const DEFAULT_THUMBNAIL_ANALYSIS: ThumbnailAnalysis = {
  ctrScore: 0,
  emotionScore: 0,
  colorScore: 0,
  textScore: 0,
  overallScore: 0,
  strengths: [],
  improvements: [],
};

const DEFAULT_TITLE_ANALYSIS = {
  ctrScore: 0,
  seoScore: 0,
  emotionScore: 0,
  curiosityScore: 0,
  lengthScore: 0,
  overallScore: 0,
  improvements: [] as string[],
  betterTitles: [] as string[],
};

/* ============================================================
   HOOK
============================================================ */

export function useBenchmarkSearch({
  language,
  excludeShorts,
  min10Minutes,
  last30Days,
  setError,
}: UseBenchmarkSearchOptions) {
  /* ==========================================================
     RUN BENCHMARK SEARCH
  ========================================================== */

  const runBenchmarkSearch = useCallback(
    async ({
      keyword,
      order,
      setLoading,
      setLoadingStep,
      setLoadingProgress,
    }: {
      keyword: string;

      order: string;

      setLoading: (value: boolean) => void;

      setLoadingStep: (value: string) => void;

      setLoadingProgress: (value: number) => void;
    }): Promise<BenchmarkSearchResult | null> => {
      try {
        /* ======================================================
           0. START LOADING
        ====================================================== */

        startLoading({
          setLoading,
          setLoadingStep,
          setLoadingProgress,
        });

        setError("");

        /* ======================================================
           1. BENCHMARK SEARCH
        ====================================================== */

        setLoadingStep(
          language === "ko"
            ? "🔍 YouTube 데이터를 가져오는 중..."
            : "🔍 Fetching YouTube data..."
        );

        const {
          processed,
          ai,
        } = await executeBenchmarkSearch({
          keyword,
          order,
          language,
          excludeShorts,
          min10Minutes,
          last30Days,
          onStep: setLoadingStep,
          onProgress: setLoadingProgress,
        });

        /* ======================================================
           2. PARALLEL AI ANALYSIS
           
           These analyses do not depend on each other.
        ====================================================== */

        setLoadingStep(
          language === "ko"
            ? "🧠 AI 분석을 병렬로 실행하는 중..."
            : "🧠 Running AI analyses in parallel..."
        );

        const missedOpportunitiesPromise =
          (async (): Promise<
            MissedOpportunity[]
          > => {
            try {
              setLoadingStep(
                language === "ko"
                  ? "🎯 놓친 기회를 분석하는 중..."
                  : "🎯 Analyzing missed opportunities..."
              );

              const response = await fetch(
                "/api/ai/missed-opportunities",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    keyword,
                    videos:
                      processed.results,
                  }),
                }
              );

              if (!response.ok) {
                console.warn(
                  "Missed opportunities API returned:",
                  response.status
                );

                return [];
              }

              const data =
                await response.json();

              return Array.isArray(
                data?.opportunities
              )
                ? data.opportunities
                : [];
            } catch (error) {
              console.error(
                "Missed opportunities analysis failed:",
                error
              );

              return [];
            }
          })();

        const thumbnailAnalysisPromise =
          (async (): Promise<ThumbnailAnalysis> => {
            try {
              setLoadingStep(
                language === "ko"
                  ? "🖼️ 썸네일을 분석하는 중..."
                  : "🖼️ Analyzing thumbnail..."
              );

              const firstTitle =
                ai.titles?.[0] as
                  | {
                      title?: string;
                    }
                  | undefined;

              const firstThumbnail =
                ai.thumbnail?.[0] as
                  | {
                      prompt?: string;
                    }
                  | undefined;

              const response = await fetch(
                "/api/ai/thumbnail-analyzer",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    title:
                      firstTitle?.title ??
                      keyword,

                    thumbnailPrompt:
                      firstThumbnail?.prompt ??
                      "",
                  }),
                }
              );

              if (!response.ok) {
                console.warn(
                  "Thumbnail analyzer API returned:",
                  response.status
                );

                return DEFAULT_THUMBNAIL_ANALYSIS;
              }

              const data =
                await response.json();

              return data
                ? {
                    ctrScore:
                      data.ctrScore ?? 0,
                    emotionScore:
                      data.emotionScore ?? 0,
                    colorScore:
                      data.colorScore ?? 0,
                    textScore:
                      data.textScore ?? 0,
                    overallScore:
                      data.overallScore ?? 0,
                    strengths:
                      Array.isArray(
                        data.strengths
                      )
                        ? data.strengths
                        : [],
                    improvements:
                      Array.isArray(
                        data.improvements
                      )
                        ? data.improvements
                        : [],
                  }
                : DEFAULT_THUMBNAIL_ANALYSIS;
            } catch (error) {
              console.error(
                "Thumbnail analyzer failed:",
                error
              );

              return DEFAULT_THUMBNAIL_ANALYSIS;
            }
          })();

        const titleAnalysisPromise =
          (async () => {
            try {
              setLoadingStep(
                language === "ko"
                  ? "✍️ 제목을 분석하는 중..."
                  : "✍️ Analyzing title..."
              );

              const firstTitle =
                ai.titles?.[0] as
                  | {
                      title?: string;
                    }
                  | undefined;

              const response = await fetch(
                "/api/ai/title-analyzer",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    title:
                      firstTitle?.title ??
                      keyword,
                  }),
                }
              );

              if (!response.ok) {
                console.warn(
                  "Title analyzer API returned:",
                  response.status
                );

                return DEFAULT_TITLE_ANALYSIS;
              }

              const data =
                await response.json();

              return {
                ctrScore:
                  data?.ctrScore ?? 0,

                seoScore:
                  data?.seoScore ?? 0,

                emotionScore:
                  data?.emotionScore ?? 0,

                curiosityScore:
                  data?.curiosityScore ?? 0,

                lengthScore:
                  data?.lengthScore ?? 0,

                overallScore:
                  data?.overallScore ?? 0,

                improvements:
                  Array.isArray(
                    data?.improvements
                  )
                    ? data.improvements
                    : [],

                betterTitles:
                  Array.isArray(
                    data?.betterTitles
                  )
                    ? data.betterTitles
                    : [],
              };
            } catch (error) {
              console.error(
                "Title analyzer failed:",
                error
              );

              return DEFAULT_TITLE_ANALYSIS;
            }
          })();

        const plannerPromise =
          (async (): Promise<
            PlannerResponse | null
          > => {
            try {
              setLoadingStep(
                language === "ko"
                  ? "📅 콘텐츠 플랜을 만드는 중..."
                  : "📅 Building content plan..."
              );

              const response = await fetch(
                "/api/ai/planner",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    keyword,
                    language,
                  }),
                }
              );

              if (!response.ok) {
                console.warn(
                  "Planner API returned:",
                  response.status
                );

                return null;
              }

              const data =
                await response.json();

              return data ?? null;
            } catch (error) {
              console.error(
                "Planner generation failed:",
                error
              );

              return null;
            }
          })();

        /* ======================================================
           WAIT FOR PARALLEL ANALYSIS
        ====================================================== */

        const [
          missedOpportunities,
          thumbnailAnalysis,
          titleAnalysis,
          planner,
        ] = await Promise.all([
          missedOpportunitiesPromise,
          thumbnailAnalysisPromise,
          titleAnalysisPromise,
          plannerPromise,
        ]);

        /* ======================================================
           3. CONTENT STRATEGY
           
           This intentionally runs AFTER the benchmark and
           keyword intelligence are ready.
        ====================================================== */

        let contentStrategy:
          | ContentStrategy
          | null = null;

        try {
          setLoadingStep(
            language === "ko"
              ? "🧠 콘텐츠 전략을 생성하는 중..."
              : "🧠 Generating content strategy..."
          );

          const opportunityScore =
            calculateOpportunityScoreV2(
              processed.results
            );

          const finalDecision =
            calculateFinalDecision({
              opportunity:
                ai.keywordIntelligence
                  ?.opportunity ?? 0,

              difficulty:
                ai.keywordIntelligence
                  ?.difficulty ?? 0,

              confidence:
                ai.keywordIntelligence
                  ?.confidence ?? 0,

              benchmarkScore:
                ai.report?.score ?? 0,
            });

          const strategyResponse =
            await fetch(
              "/api/ai/content-strategy",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  keyword,
                  language,

                  decision:
                    finalDecision.decision,

                  opportunityScore:
                    opportunityScore.total,

                  benchmarkScore:
                    ai.report?.score ?? 0,

                  results:
                    processed.results,
                }),
              }
            );

          if (!strategyResponse.ok) {
            console.warn(
              "Content strategy API returned:",
              strategyResponse.status
            );
          } else {
            const strategyData =
              await strategyResponse.json();

            if (strategyData) {
              contentStrategy =
                strategyData;
            }
          }
        } catch (error) {
          console.error(
            "Content strategy generation failed:",
            error
          );
        }

        /* ======================================================
           4. COMPLETE
        ====================================================== */

        setLoadingProgress(100);

        setLoadingStep(
          language === "ko"
            ? "✅ 분석이 완료되었습니다."
            : "✅ Analysis complete."
        );

        /* ======================================================
           5. RETURN FINAL RESULT
        ====================================================== */

        return {
          processed,

          ai,

          missedOpportunities,

          thumbnailAnalysis,

          titleAnalysis,

          planner,

          contentStrategy,

          /*
           * Creator Workspace is intentionally not generated
           * during benchmark search.
           *
           * It is generated only when the user explicitly
           * requests content creation.
           */
          creatorWorkspace: null,
        };
      } catch (error) {
        /* ====================================================
           GLOBAL PIPELINE ERROR
        ==================================================== */

        console.error(
          "Benchmark search pipeline failed:",
          error
        );

        throw error;
      } finally {
        /* ====================================================
           ALWAYS FINISH LOADING
        ==================================================== */

        finishLoading({
          setLoading,
          setLoadingStep,
        });
      }
    },
    [
      language,
      excludeShorts,
      min10Minutes,
      last30Days,
      setError,
    ]
  );

  /* ============================================================
     PUBLIC API
  ============================================================ */

  return {
    runBenchmarkSearch,
  };
}