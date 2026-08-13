import { askAI } from "./openai";

import type {
  KeywordIntelligence,
  SEOAnalysis,
  CompetitionAnalysis,
  CreatorKit,
  SEOOptimizer,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  ContentIdea,
  Strategy,
  TitleSuggestion,
  ContentGap,
  ThumbnailPlan,
  Opportunity,
} from "./types";

/* =========================================================
   TYPES
========================================================= */

type AIRequest = {
  language: string;

  reportPrompt: string;
  ideaPrompt: string;
  strategyPrompt: string;
  competitionPrompt: string;
  titlePrompt: string;
  seoPrompt: string;
  seoOptimizerPrompt: string;
  contentGapPrompt: string;
  channelAuditPrompt: string;
  thumbnailPrompt: string;
  creatorKitPrompt: string;
  recommendedChannelsPrompt: string;
  opportunityPrompt: string;
  contentPlannerPrompt: string;
  aiThumbnailPrompt: string;
};

type AIParseResult<T = unknown> = {
  success: boolean;
  data: T | null;
  error?: string;
};

type AIExecutionResult = {
  success: boolean;
  value: string;
  error?: string;
};


/* =========================================================
   DEBUG
========================================================= */

const DEBUG_AI =
  process.env.NODE_ENV !== "production";


function debugLog(
  ...args: unknown[]
) {
  if (DEBUG_AI) {
    console.log(...args);
  }
}


/* =========================================================
   JSON PARSER
========================================================= */

function parseAIJson<T = unknown>(
  text: string,
  label = "AI"
): AIParseResult<T> {

  if (
    typeof text !== "string" ||
    !text.trim()
  ) {
    console.error(
      `❌ ${label}: EMPTY AI RESPONSE`
    );

    return {
      success: false,
      data: null,
      error: "EMPTY_RESPONSE",
    };
  }

  debugLog(
    `===== ${label} RAW AI RESPONSE =====`
  );

  debugLog(text);

  let cleaned = text.trim();


  /*
   * Remove markdown code fences
   */

  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();


  /*
   * Remove accidental leading/trailing text
   * around JSON.
   */

  const firstObject =
    cleaned.indexOf("{");

  const lastObject =
    cleaned.lastIndexOf("}");

  const firstArray =
    cleaned.indexOf("[");

  const lastArray =
    cleaned.lastIndexOf("]");


  /*
   * Object JSON
   */

  if (
    firstObject !== -1 &&
    lastObject !== -1 &&
    (
      firstArray === -1 ||
      firstObject < firstArray
    )
  ) {
    const possibleObject =
      cleaned.slice(
        firstObject,
        lastObject + 1
      );

    try {
      const parsed =
        JSON.parse(possibleObject);

      debugLog(
        `===== ${label} JSON PARSE SUCCESS =====`
      );

      return {
        success: true,
        data: parsed as T,
      };

    } catch {
      // Continue to array attempt.
    }
  }


  /*
   * Array JSON
   */

  if (
    firstArray !== -1 &&
    lastArray !== -1
  ) {

    const possibleArray =
      cleaned.slice(
        firstArray,
        lastArray + 1
      );

    try {
      const parsed =
        JSON.parse(possibleArray);

      debugLog(
        `===== ${label} JSON PARSE SUCCESS =====`
      );

      return {
        success: true,
        data: parsed as T,
      };

    } catch {
      // Continue to error.
    }
  }


  console.error(
    `❌ ${label}: JSON PARSE FAILED`
  );

  if (DEBUG_AI) {
    console.error(cleaned);
  }

  return {
    success: false,
    data: null,
    error: "INVALID_JSON",
  };
}


/* =========================================================
   SAFE HELPERS
========================================================= */

function safeArray<T = unknown>(
  value: unknown
): T[] {

  return Array.isArray(value)
    ? value as T[]
    : [];
}


function safeString(
  value: unknown
): string {

  if (
    typeof value === "string"
  ) {
    return value;
  }

  /*
   * Prevent accidental undefined/null
   */

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  /*
   * Useful when AI accidentally returns
   * a primitive value.
   */

  return String(value);
}


function safeNumber(
  value: unknown
): number {

  /*
   * Normal number
   */

  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }


  /*
   * AI sometimes returns:
   *
   * "82"
   * "82.5"
   * "82%"
   */

  if (
    typeof value === "string"
  ) {

    const cleaned =
      value
        .replace(/,/g, "")
        .replace(/%/g, "")
        .trim();

    const parsed =
      Number(cleaned);

    if (
      Number.isFinite(parsed)
    ) {
      return parsed;
    }
  }


  return 0;
}


function safeObject<T>(
  value: unknown,
  fallback: T
): T {

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as T;
  }

  return fallback;
}


/* =========================================================
   RECORD HELPER
========================================================= */

function asRecord(
  value: unknown
): Record<string, unknown> {

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<
      string,
      unknown
    >;
  }

  return {};
}


/* =========================================================
   BENCHMARK NORMALIZER
========================================================= */

function safeBenchmark(
  data: unknown
) {

  const benchmark =
    asRecord(data);


  const overview =
    asRecord(
      benchmark.overview
    );


  const prediction =
    asRecord(
      benchmark.prediction
    );


  const seo =
    asRecord(
      benchmark.seo
    );


  const audience =
    asRecord(
      benchmark.audience
    );


  const uploadStrategy =
    asRecord(
      benchmark.uploadStrategy
    );


  const risk =
    asRecord(
      benchmark.risk
    );


  return {

    score:
      safeNumber(
        benchmark.score
      ),


    overview: {

      avgViews:
        safeString(
          overview.avgViews
        ),

      avgDuration:
        safeString(
          overview.avgDuration
        ),

      uploadFrequency:
        safeString(
          overview.uploadFrequency
        ),

      bestVideo:
        safeString(
          overview.bestVideo
        ),
    },


    insights:
  safeArray<string>(
    benchmark.insights
  ),


    actionPlan:
  safeArray<string>(
    benchmark.actionPlan
  ),


    analysis:
      safeString(
        benchmark.analysis
      ),


    prediction: {

      successProbability:
        safeNumber(
          prediction.successProbability
        ),

      expectedViews:
        safeString(
          prediction.expectedViews
        ),

      expectedCTR:
        safeString(
          prediction.expectedCTR
        ),

      expectedRPM:
        safeString(
          prediction.expectedRPM
        ),

      estimatedRevenue:
        safeString(
          prediction.estimatedRevenue
        ),
    },


    seo: {

      score:
        safeNumber(
          seo.score
        ),

      titleScore:
        safeNumber(
          seo.titleScore
        ),

      keywordScore:
        safeNumber(
          seo.keywordScore
        ),

      descriptionScore:
        safeNumber(
          seo.descriptionScore
        ),
    },


    audience: {

      retention:
        safeNumber(
          audience.retention
        ),

      engagement:
        safeNumber(
          audience.engagement
        ),

      target:
        safeString(
          audience.target
        ),
    },


    uploadStrategy: {

      bestDay:
        safeString(
          uploadStrategy.bestDay
        ),

      bestTime:
        safeString(
          uploadStrategy.bestTime
        ),

      recommendedLength:
        safeString(
          uploadStrategy.recommendedLength
        ),
    },


    risk: {

  level:
    safeString(
      risk.level
    ),

  reasons:
    safeArray<string>(
      risk.reasons
    ),
},
  };
}


/* =========================================================
   AI CALL WRAPPER
========================================================= */

async function executeAI(
  prompt: string,
  language: string,
  label: string
): Promise<AIExecutionResult> {

  try {

    if (
      !prompt ||
      !prompt.trim()
    ) {

      console.error(
        `❌ ${label}: EMPTY PROMPT`
      );

      return {
        success: false,
        value: "",
        error: "EMPTY_PROMPT",
      };
    }


    debugLog(
      `🤖 ${label}: START`
    );


    const start =
      performance.now();


    const result =
      await askAI(
        prompt,
        language
      );


    const elapsed =
      Math.round(
        performance.now() - start
      );


    debugLog(
      `✅ ${label}: ${elapsed}ms`
    );


    if (
      typeof result !== "string"
    ) {

      console.error(
        `❌ ${label}: INVALID RESPONSE TYPE`
      );

      return {
        success: false,
        value: "",
        error: "INVALID_RESPONSE_TYPE",
      };
    }


    if (
      !result.trim()
    ) {

      console.error(
        `❌ ${label}: EMPTY RESPONSE`
      );

      return {
        success: false,
        value: "",
        error: "EMPTY_RESPONSE",
      };
    }


    return {
      success: true,
      value: result,
    };

  } catch (error) {

    console.error(
      `❌ ${label}: AI REQUEST FAILED`
    );

    console.error(error);

    return {
      success: false,
      value: "",
      error:
        error instanceof Error
          ? error.message
          : "UNKNOWN_AI_ERROR",
    };
  }
}


/* =========================================================
   MAIN AI ENGINE
========================================================= */

export async function generateAllAI({

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

}: AIRequest) {

  console.log(
    "🚀 Benchmark AI Engine START"
  );


  const globalStart =
    performance.now();


  /*
   * IMPORTANT:
   *
   * We intentionally keep these calls
   * parallel for now.
   *
   * The next engine upgrade will merge
   * these into logical AI groups.
   *
   * But first we make the existing
   * pipeline fault tolerant.
   */

  const results =
    await Promise.all([

      executeAI(
        reportPrompt,
        language,
        "REPORT"
      ),

      executeAI(
        ideaPrompt,
        language,
        "IDEA"
      ),

      executeAI(
        strategyPrompt,
        language,
        "STRATEGY"
      ),

      executeAI(
        competitionPrompt,
        language,
        "COMPETITION"
      ),

      executeAI(
        titlePrompt,
        language,
        "TITLES"
      ),

      executeAI(
        seoPrompt,
        language,
        "SEO"
      ),

      executeAI(
        seoOptimizerPrompt,
        language,
        "SEO OPTIMIZER"
      ),

      executeAI(
        contentGapPrompt,
        language,
        "CONTENT GAP"
      ),

      executeAI(
        channelAuditPrompt,
        language,
        "CHANNEL AUDIT"
      ),

      executeAI(
        thumbnailPrompt,
        language,
        "THUMBNAIL"
      ),

      executeAI(
        creatorKitPrompt,
        language,
        "CREATOR KIT"
      ),

      executeAI(
        recommendedChannelsPrompt,
        language,
        "RECOMMENDED CHANNELS"
      ),

      executeAI(
        opportunityPrompt,
        language,
        "OPPORTUNITIES"
      ),

      executeAI(
        contentPlannerPrompt,
        language,
        "CONTENT PLANNER"
      ),

      executeAI(
        aiThumbnailPrompt,
        language,
        "AI THUMBNAIL"
      ),
    ]);


  const [

    reportResult,
    ideaResult,
    strategyResult,
    competitionResult,
    titlesResult,
    seoResult,
    seoOptimizerResult,
    contentGapResult,
    channelAuditResult,
    thumbnailResult,
    creatorKitResult,
    recommendedChannelsResult,
    opportunitiesResult,
    contentPlannerResult,
    aiThumbnailResult,

  ] = results;


  /*
   * =======================================================
   * PARSE
   * =======================================================
   */

  const reportParsed =
    parseAIJson(
      reportResult.value,
      "REPORT"
    );


  const ideaParsed =
    parseAIJson(
      ideaResult.value,
      "IDEA"
    );


  const strategyParsed =
    parseAIJson(
      strategyResult.value,
      "STRATEGY"
    );


  const competitionParsed =
    parseAIJson(
      competitionResult.value,
      "COMPETITION"
    );


  const titlesParsed =
    parseAIJson(
      titlesResult.value,
      "TITLES"
    );


  const seoParsed =
    parseAIJson(
      seoResult.value,
      "SEO"
    );


  const seoOptimizerParsed =
    parseAIJson(
      seoOptimizerResult.value,
      "SEO OPTIMIZER"
    );


  const contentGapParsed =
    parseAIJson(
      contentGapResult.value,
      "CONTENT GAP"
    );


  const channelAuditParsed =
    parseAIJson(
      channelAuditResult.value,
      "CHANNEL AUDIT"
    );


  const thumbnailParsed =
    parseAIJson(
      thumbnailResult.value,
      "THUMBNAIL"
    );


  const creatorKitParsed =
    parseAIJson(
      creatorKitResult.value,
      "CREATOR KIT"
    );


  const opportunitiesParsed =
    parseAIJson(
      opportunitiesResult.value,
      "OPPORTUNITIES"
    );


  const contentPlannerParsed =
    parseAIJson(
      contentPlannerResult.value,
      "CONTENT PLANNER"
    );


  const aiThumbnailParsed =
    parseAIJson(
      aiThumbnailResult.value,
      "AI THUMBNAIL"
    );


  /*
   * =======================================================
   * BENCHMARK ROOT
   * =======================================================
   */

  const reportRoot =
    asRecord(
      reportParsed.data
    );


  /*
   * =======================================================
   * KEYWORD INTELLIGENCE
   * =======================================================
   */

  const keywordIntelligence =
    safeObject<KeywordIntelligence>(
      reportRoot.keywordIntelligence,
      {
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
      }
    );


  /*
   * =======================================================
   * COMPETITION
   * =======================================================
   */

  const competition =
    safeObject<CompetitionAnalysis>(
      competitionParsed.data,
      {
        competitionScore: 0,
        difficulty: "",
        successProbability: 0,
        recommendation: "",
        strengths: [],
        weaknesses: [],
        marketSaturation: "",
        barrierToEntry: "",
        contentQuality: 0,
        thumbnailQuality: 0,
        titleQuality: 0,
        uploadFrequency: "",
        opportunityScore: 0,
        opportunities: [],
      }
    );


  /*
   * =======================================================
   * SEO
   * =======================================================
   */

  const seo =
    safeObject<SEOAnalysis>(
      seoParsed.data,
      {
        overallScore: 0,
        titleScore: 0,
        descriptionScore: 0,
        keywordDensity: 0,
        rankingProbability: 0,
        recommendedKeywords: [],
        missingKeywords: [],
        suggestions: [],
      }
    );


  /*
   * =======================================================
   * SEO OPTIMIZER
   * =======================================================
   */

  const seoOptimizer =
    safeObject<SEOOptimizer>(
      seoOptimizerParsed.data,
      {
        betterTitle: "",
        betterDescription: "",
        tags: [],
        keywordCluster: [],
        searchIntent: "",
        rankingTips: [],
      }
    );


  /*
   * =======================================================
   * CHANNEL AUDIT
   * =======================================================
   */

  const channelAudit =
    safeObject<ChannelAudit>(
      channelAuditParsed.data,
      {
        overallScore: 0,
        niche: "",
        uploadFrequency: "",
        titleStyle: "",
        thumbnailStyle: "",
        strengths: [],
        weaknesses: [],
        opportunities: [],
        estimatedCTR: "",
        estimatedRPM: "",
        growthPotential: "",
        recommendation: "",
      }
    );


  /*
   * =======================================================
   * CREATOR KIT
   * =======================================================
   */

  const creatorKit =
    safeObject<CreatorKit>(
      creatorKitParsed.data,
      {
        hook: "",
        script: "",
        description: "",
        hashtags: [],
        thumbnailPrompt: "",
        callToAction: "",
        communityPost: "",
        shortsScript: "",
        instagramCaption: "",
        twitterPost: "",
      }
    );


  /*
   * =======================================================
   * SUCCESS METRICS
   * =======================================================
   */

  const moduleResults = [

    reportResult,
    ideaResult,
    strategyResult,
    competitionResult,
    titlesResult,
    seoResult,
    seoOptimizerResult,
    contentGapResult,
    channelAuditResult,
    thumbnailResult,
    creatorKitResult,
    recommendedChannelsResult,
    opportunitiesResult,
    contentPlannerResult,
    aiThumbnailResult,

  ];


  const successfulModules =
    moduleResults.filter(
      result => result.success
    ).length;


  const failedModules =
    moduleResults.filter(
      result => !result.success
    ).length;


  const totalTime =
    Math.round(
      performance.now() - globalStart
    );


  console.log(
    `🚀 Benchmark AI COMPLETE`
  );


  console.log(
    `⏱️ Total: ${totalTime}ms`
  );


  console.log(
    `✅ Modules: ${successfulModules}/15`
  );


  if (
    failedModules > 0
  ) {

    console.warn(
      `⚠️ Failed modules: ${failedModules}`
    );
  }


  /*
   * =======================================================
   * FINAL RETURN
   * =======================================================
   */

  return {

    /*
     * Meta
     */

    meta: {

      success:
        successfulModules > 0,

      totalModules: 15,

      successfulModules,

      failedModules,

      processingTimeMs:
        totalTime,
    },


    /*
     * Benchmark
     */

    report:
      safeBenchmark(
        reportRoot.benchmark
      ),


    /*
     * Keyword Intelligence
     */

    keywordIntelligence,


    /*
     * Ideas
     */

    idea:
  safeArray<ContentIdea>(
    ideaParsed.data
  ),


    /*
     * Strategy
     */

    strategy:
  safeArray<Strategy>(
    strategyParsed.data
  ),


    /*
     * Competition
     */

    competition,


    /*
     * Titles
     */

    titles:
  safeArray<TitleSuggestion>(
    titlesParsed.data
  ),


    /*
     * SEO
     */

    seo,


    /*
     * SEO Optimizer
     */

    seoOptimizer,


    /*
     * Content Gap
     */

    contentGap:
  safeArray<ContentGap>(
    contentGapParsed.data
  ),


    /*
     * Channel Audit
     */

    channelAudit,


    /*
     * Thumbnail
     */

    thumbnail:
  safeArray<ThumbnailPlan>(
    thumbnailParsed.data
  ),

    /*
     * Creator Kit
     */

    creatorKit,


    /*
     * Recommended Channels
     *
     * This prompt currently returns
     * plain text, so we intentionally
     * don't JSON.parse it.
     */

    recommendedChannels:
      safeString(
        recommendedChannelsResult.value
      ),


    /*
     * Opportunities
     */

    opportunities:
  safeArray<Opportunity>(
    opportunitiesParsed.data
  ),


    /*
     * Content Planner
     */

    contentPlanner:
      safeArray<ContentPlanner>(
        contentPlannerParsed.data
      ),


    /*
     * AI Thumbnail
     */

    aiThumbnail:
      safeArray<AIThumbnail>(
        aiThumbnailParsed.data
      ),
  };
}