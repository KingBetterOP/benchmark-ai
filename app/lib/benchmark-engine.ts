import { generateAllAI } from "./ai";
import type {
  Video,
  Channel,
} from "./types";

import {
  createBenchmarkPrompt,
  createIdeaPrompt,
  createStrategyPrompt,
  createCompetitionPrompt,
  createTitlePrompt,
  createSEOPrompt,
  createSEOOptimizerPrompt,
  createContentGapPrompt,
  createRecommendedChannelsPrompt,
  createOpportunityPrompt,
  createThumbnailPrompt,
  createCreatorKitPrompt,
  createChannelAuditPrompt,
  createContentPlannerPrompt,
  createAIThumbnailPrompt,
} from "./prompts";


/* =========================================================
   TYPES
========================================================= */

export type BenchmarkInput = {
  keyword: string;
  language: "ko" | "en";
  videos: unknown[];
};


export type BenchmarkResult = {
  report: unknown;
  ideas: unknown;
  strategy: unknown;
  seo: unknown;
  titles: unknown;
  thumbnail: unknown;
  gap: unknown;
  competition: unknown;
  opportunities: unknown;
};


/* =========================================================
   HELPERS
========================================================= */

function normalizeVideos(
  videos: unknown[]
) {
  return videos.filter(
    (video) =>
      video !== null &&
      typeof video === "object"
  );
}


/* =========================================================
   BENCHMARK ENGINE
========================================================= */

export async function runBenchmark(
  input: BenchmarkInput
): Promise<BenchmarkResult> {

  /* =======================================================
     1. INPUT VALIDATION
  ======================================================= */

  if (
    !input ||
    typeof input !== "object"
  ) {
    throw new Error(
      "Benchmark 입력값이 올바르지 않습니다."
    );
  }


  const keyword =
    input.keyword?.trim();


  if (!keyword) {
    throw new Error(
      "Benchmark 검색어가 없습니다."
    );
  }


  if (
    input.language !== "ko" &&
    input.language !== "en"
  ) {
    throw new Error(
      "지원하지 않는 Benchmark 언어입니다."
    );
  }


  if (
    !Array.isArray(input.videos)
  ) {
    throw new Error(
      "Benchmark 영상 데이터가 올바르지 않습니다."
    );
  }


  const videos =
    normalizeVideos(
      input.videos
    );


  if (videos.length === 0) {
    throw new Error(
      "분석할 YouTube 영상이 없습니다."
    );
  }


  const language =
    input.language;


  console.log(
    "🚀 Benchmark Engine START"
  );


  console.log(
    "Keyword:",
    keyword
  );


  console.log(
    "Language:",
    language
  );


  console.log(
    "Videos:",
    videos.length
  );


  /* =======================================================
     2. TOP VIDEOS
  ======================================================= */

  const topVideos =
  videos.slice(
    0,
    10
  ) as Video[];


  /* =======================================================
     3. CHANNEL DATA
  ======================================================= */

  const channels: Channel[] =
  videos
    .map((video) => {
      const item =
        video as {
          channel?: {
            name?: unknown;
            subscribers?: unknown;
            videos?: unknown;
            views?: unknown;
            thumbnail?: unknown;
          };

          channelTitle?: unknown;
          channelName?: unknown;
        };

      const channel =
        item.channel;

      const name =
        typeof channel?.name === "string"
          ? channel.name
          : typeof item.channelTitle === "string"
            ? item.channelTitle
            : typeof item.channelName === "string"
              ? item.channelName
              : "";

      if (!name) {
        return null;
      }

      return {
        name,

        subscribers:
          typeof channel?.subscribers === "number"
            ? channel.subscribers
            : 0,

        videos:
          typeof channel?.videos === "number"
            ? channel.videos
            : 0,

        views:
          typeof channel?.views === "number"
            ? channel.views
            : 0,

        thumbnail:
          typeof channel?.thumbnail === "string"
            ? channel.thumbnail
            : "",
      };
    })
    .filter(
      (
        channel
      ): channel is Channel =>
        channel !== null
    );


  /* =======================================================
     4. PROMPTS
  ======================================================= */

  const reportPrompt =
    createBenchmarkPrompt(
      keyword,
      topVideos
    );


  const ideaPrompt =
    createIdeaPrompt(
      keyword
    );


  const strategyPrompt =
    createStrategyPrompt(
      keyword
    );


  const competitionPrompt =
    createCompetitionPrompt(
      keyword
    );


  const titlePrompt =
    createTitlePrompt(
      keyword
    );


  const seoPrompt =
    createSEOPrompt(
      keyword
    );


  const seoOptimizerPrompt =
    createSEOOptimizerPrompt(
      keyword
    );


  const contentGapPrompt =
    createContentGapPrompt(
      keyword
    );


  const primaryChannel =
    channels[0];


  const channelAuditPrompt =
    createChannelAuditPrompt(
      primaryChannel?.name ?? ""
    );


  const contentPlannerPrompt =
    createContentPlannerPrompt(
      keyword
    );


  const aiThumbnailPrompt =
    createAIThumbnailPrompt(
      keyword
    );


  const recommendedChannelsPrompt =
    createRecommendedChannelsPrompt(
      keyword,
      channels
    );


  const opportunityPrompt =
    createOpportunityPrompt();


  const thumbnailPrompt =
    createThumbnailPrompt(
      keyword
    );


  const creatorKitPrompt =
    createCreatorKitPrompt(
      keyword
    );


  /* =======================================================
     5. PROMPT VALIDATION
  ======================================================= */

  const prompts = {
    reportPrompt,
    ideaPrompt,
    strategyPrompt,
    competitionPrompt,
    titlePrompt,
    seoPrompt,
    seoOptimizerPrompt,
    contentGapPrompt,
    channelAuditPrompt,
    contentPlannerPrompt,
    aiThumbnailPrompt,
    recommendedChannelsPrompt,
    opportunityPrompt,
    thumbnailPrompt,
    creatorKitPrompt,
  };


  const invalidPrompts =
    Object.entries(
      prompts
    )
      .filter(
        ([, value]) =>
          typeof value !== "string" ||
          !value.trim()
      )
      .map(
        ([name]) =>
          name
      );


  if (
    invalidPrompts.length > 0
  ) {

    console.error(
      "❌ Invalid Benchmark prompts:",
      invalidPrompts
    );


    throw new Error(
      "Benchmark AI 프롬프트 생성에 실패했습니다."
    );
  }


  /* =======================================================
     6. AI ENGINE
  ======================================================= */

  let ai;


  try {

    ai =
      await generateAllAI({

        language,

        reportPrompt,

        ideaPrompt,

        strategyPrompt,

        competitionPrompt,

        titlePrompt,

        seoPrompt,

        seoOptimizerPrompt,

        contentGapPrompt,

        channelAuditPrompt,

        thumbnailPrompt,

        creatorKitPrompt,

        recommendedChannelsPrompt,

        opportunityPrompt,

        contentPlannerPrompt,

        aiThumbnailPrompt,

      });

  } catch (error) {

    console.error(
      "❌ Benchmark AI Engine failed:",
      error
    );


    throw new Error(
      "Benchmark AI 분석에 실패했습니다."
    );
  }


  /* =======================================================
     7. AI RESULT VALIDATION
  ======================================================= */

  if (
    !ai ||
    typeof ai !== "object"
  ) {

    throw new Error(
      "Benchmark AI 결과가 올바르지 않습니다."
    );
  }


  const result =
    ai as Record<
      string,
      unknown
    >;


  const aiMeta =
    result.meta as
      | {
          successfulModules?: number;
          totalModules?: number;
        }
      | undefined;


  const successfulModules =
    aiMeta?.successfulModules ??
    0;


  const totalModules =
    aiMeta?.totalModules ??
    0;


  if (
    totalModules > 0 &&
    successfulModules === 0
  ) {

    throw new Error(
      "모든 Benchmark AI 분석 모듈이 실패했습니다."
    );
  }


  /* =======================================================
     8. FINAL RESULT
  ======================================================= */

  const benchmarkResult: BenchmarkResult = {

    report:
      result.report ??
      null,

    ideas:
      result.ideas ??
      result.idea ??
      null,

    strategy:
      result.strategy ??
      null,

    seo:
      result.seo ??
      null,

    titles:
      result.titles ??
      result.title ??
      null,

    thumbnail:
      result.thumbnail ??
      null,

    gap:
      result.gap ??
      result.contentGap ??
      null,

    competition:
      result.competition ??
      null,

    opportunities:
      result.opportunities ??
      result.opportunity ??
      null,

  };


  console.log(
    "===================================="
  );


  console.log(
    "🏆 Benchmark Engine COMPLETE"
  );


  console.log(
    `🤖 AI: ${successfulModules}/${totalModules}`
  );


  console.log(
    "===================================="
  );


  return benchmarkResult;
}