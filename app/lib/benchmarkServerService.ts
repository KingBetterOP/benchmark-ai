import {
  searchYoutubeServer,
} from "./serverSearch";

import {
  processVideos,
} from "./processVideos";

import {
  generateAllAI as generateAllAIServer,
} from "./aiServer";

import {
  calculateOpportunityScoreV2,
} from "./opportunityScoreV2";

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

import type {
  BenchmarkResult,
} from "./types";

type ServerBenchmarkInput = {
  keyword: string;
  order: string;
  language: string;

  excludeShorts: boolean;
  min10Minutes: boolean;
  last30Days: boolean;
};

const ALLOWED_ORDERS = [
  "relevance",
  "viewCount",
  "date",
];

function validateInput(
  input: ServerBenchmarkInput
) {
  const keyword =
    input.keyword?.trim();

  if (!keyword) {
    throw new Error(
      "검색어를 입력해주세요."
    );
  }

  if (keyword.length > 100) {
    throw new Error(
      "검색어가 너무 깁니다."
    );
  }

  if (
    !ALLOWED_ORDERS.includes(
      input.order
    )
  ) {
    throw new Error(
      "지원하지 않는 검색 정렬 방식입니다."
    );
  }

  if (
    input.language !== "ko" &&
    input.language !== "en"
  ) {
    throw new Error(
      "지원하지 않는 분석 언어입니다."
    );
  }

  return {
    keyword,
    order: input.order,
    language: input.language,
    excludeShorts:
      Boolean(input.excludeShorts),
    min10Minutes:
      Boolean(input.min10Minutes),
    last30Days:
      Boolean(input.last30Days),
  };
}

export async function benchmarkServerService(
  input: ServerBenchmarkInput
): Promise<BenchmarkResult> {

  const start =
    performance.now();

  const validated =
    validateInput(input);

  /*
   * =====================================================
   * 1. YOUTUBE
   * =====================================================
   */

  console.log(
    "🔍 Server Benchmark: YouTube"
  );

  const youtube =
    await searchYoutubeServer({
      keyword:
        validated.keyword,

      order:
        validated.order,

      language:
        validated.language,

      last30Days:
        validated.last30Days,
    });

  if (
    !youtube.items.length
  ) {
    throw new Error(
      `"${validated.keyword}"에 대한 YouTube 검색 결과가 없습니다.`
    );
  }

  /*
   * =====================================================
   * 2. PROCESS VIDEOS
   * =====================================================
   */

  console.log(
    "📊 Server Benchmark: processing"
  );

  const processed =
    processVideos(
      youtube.items,
      validated.excludeShorts,
      validated.min10Minutes
    );

  if (
    !processed.results.length
  ) {
    throw new Error(
      "현재 필터 조건을 만족하는 영상이 없습니다. 필터를 완화해보세요."
    );
  }

  /*
   * =====================================================
   * 3. OPPORTUNITY SCORE
   * =====================================================
   */

  console.log(
    "📈 Server Benchmark: opportunity"
  );

  const opportunityScoreV2 =
    calculateOpportunityScoreV2(
      processed.results
    );

  /*
   * =====================================================
   * 4. PROMPTS
   * =====================================================
   */

  console.log(
    "🧠 Server Benchmark: prompts"
  );

  const reportPrompt =
    createBenchmarkPrompt(
      validated.keyword,
      processed.topVideos
    );

  const ideaPrompt =
    createIdeaPrompt(
      validated.keyword
    );

  const strategyPrompt =
    createStrategyPrompt(
      validated.keyword
    );

  const competitionPrompt =
    createCompetitionPrompt(
      validated.keyword
    );

  const titlePrompt =
    createTitlePrompt(
      validated.keyword
    );

  const seoPrompt =
    createSEOPrompt(
      validated.keyword
    );

  const seoOptimizerPrompt =
    createSEOOptimizerPrompt(
      validated.keyword
    );

  const contentGapPrompt =
    createContentGapPrompt(
      validated.keyword
    );

  const primaryChannel =
    processed.channels?.[0];

  const channelAuditPrompt =
    createChannelAuditPrompt(
      primaryChannel?.name ?? ""
    );

  const contentPlannerPrompt =
    createContentPlannerPrompt(
      validated.keyword
    );

  const aiThumbnailPrompt =
    createAIThumbnailPrompt(
      validated.keyword
    );

  const recommendedChannelsPrompt =
    createRecommendedChannelsPrompt(
      validated.keyword,
      processed.channels
    );

  const opportunityPrompt =
    createOpportunityPrompt();

  const thumbnailPrompt =
    createThumbnailPrompt(
      validated.keyword
    );

  const creatorKitPrompt =
    createCreatorKitPrompt(
      validated.keyword
    );

  /*
   * =====================================================
   * 5. AI ENGINE
   * =====================================================
   */

  console.log(
    "🤖 Server Benchmark: AI"
  );

  const ai =
    await generateAllAIServer({
      language:
        validated.language,

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

  /*
   * =====================================================
   * 6. AI VALIDATION
   * =====================================================
   */

  if (
    !ai ||
    typeof ai !== "object"
  ) {
    throw new Error(
      "AI 분석 결과가 올바르지 않습니다."
    );
  }

  const successfulModules =
    ai.meta?.successfulModules ?? 0;

  const totalModules =
    ai.meta?.totalModules ?? 0;

  if (
    totalModules > 0 &&
    successfulModules === 0
  ) {
    throw new Error(
      "모든 AI 분석 모듈이 실패했습니다."
    );
  }

  /*
   * =====================================================
   * 7. META
   * =====================================================
   */

  const processingTimeMs =
    Math.round(
      performance.now() -
        start
    );

  /*
   * =====================================================
   * 8. FINAL RESULT
   * =====================================================
   */

  return {
  meta: {
    keyword:
      validated.keyword,

    order:
      validated.order,

    language:
      validated.language,

    filters: {
      excludeShorts:
        validated.excludeShorts,

      min10Minutes:
        validated.min10Minutes,

      last30Days:
        validated.last30Days,
    },

    processingTimeMs,
  },

  processed,

  opportunityScoreV2: {
  total:
    opportunityScoreV2.total,

  confidence:
    opportunityScoreV2.confidence,

  verdict:
    opportunityScoreV2.verdict,

  demand:
    opportunityScoreV2.demand,

  competition:
    opportunityScoreV2.competition,

  trend:
    opportunityScoreV2.trend,

  ctr:
    opportunityScoreV2.ctr,

  thumbnail:
    opportunityScoreV2.thumbnail,

  title:
    opportunityScoreV2.title,

  freshness:
    opportunityScoreV2.freshness,

  gap:
    opportunityScoreV2.gap,

  trendEngine: {
    recentUploads:
      opportunityScoreV2
        .trendEngine
        .recentUploads,

    averageAge:
      opportunityScoreV2
        .trendEngine
        .averageAge,
  },

  gapEngine: {
    opportunity:
      opportunityScoreV2
        .gapEngine
        .opportunity,
  },
},

  ai,
};
}