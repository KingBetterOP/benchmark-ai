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
} from "./types";

function parseAIJson(text: string) {
  console.log("===== RAW AI RESPONSE =====");
  console.log(text);

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("===== CLEANED =====");
  console.log(cleaned);

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ JSON PARSE FAILED");
    console.error(cleaned);

    return null;
  }
}
function safeArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  return typeof value === "number" ? value : 0;
}

function safeObject<T>(
  value: unknown,
  fallback: T
): T {
  if (
    value &&
    typeof value === "object"
  ) {
    return value as T;
  }

  return fallback;
}
function safeBenchmark(data: unknown) {
  const benchmark = safeObject(data, {});

  return {
    score: safeNumber((benchmark as any).score),

    overview: safeObject(
      (benchmark as any).overview,
      {
        avgViews: "",
        avgDuration: "",
        uploadFrequency: "",
        bestVideo: "",
      }
    ),

    insights: safeArray(
      (benchmark as any).insights
    ),

    actionPlan: safeArray(
      (benchmark as any).actionPlan
    ),

    analysis: safeString(
      (benchmark as any).analysis
    ),

    prediction: safeObject(
  (benchmark as any).prediction,
  {
    successProbability: 0,
    expectedViews: "",
    expectedCTR: "",
    expectedRPM: "",
    estimatedRevenue: "",
  }
),

    seo: safeObject(
  (benchmark as any).seo,
  {
    score: 0,
    titleScore: 0,
    keywordScore: 0,
    descriptionScore: 0,
  }
),

    audience: safeObject(
  (benchmark as any).audience,
  {
    retention: 0,
    engagement: 0,
    target: "",
  }
),

    uploadStrategy: safeObject(
  (benchmark as any).uploadStrategy,
  {
    bestDay: "",
    bestTime: "",
    recommendedLength: "",
  }
),

    risk: safeObject(
  (benchmark as any).risk,
  {
    level: "",
    reasons: [],
  }
),
  };
}

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
  console.log("🚨 generateAllAI START");
  console.log("REPORT PROMPT");
console.log(reportPrompt);

console.log("IDEA PROMPT");
console.log(ideaPrompt);

console.log("STRATEGY PROMPT");
console.log(strategyPrompt);

console.log("COMPETITION PROMPT");
console.log(competitionPrompt);

console.log("TITLE PROMPT");
console.log(titlePrompt);

console.log("THUMBNAIL PROMPT");
console.log(thumbnailPrompt);

console.log("RECOMMENDED CHANNELS PROMPT");
console.log(recommendedChannelsPrompt);

console.log("OPPORTUNITY PROMPT");
console.log(opportunityPrompt);
const start = performance.now();
  const [
  report,
  idea,
  strategy,
  competition,
  titles,
  seo,
  seoOptimizer,
  contentGap,
  channelAudit,
  thumbnail,
  creatorKit,
  recommendedChannels,
  opportunities,
  contentPlanner,
  aiThumbnail,
] = await Promise.all([
  askAI(reportPrompt, language),
  askAI(ideaPrompt, language),
  askAI(strategyPrompt, language),
  askAI(competitionPrompt, language),
  askAI(titlePrompt, language),
askAI(seoPrompt, language),
askAI(seoOptimizerPrompt, language),
askAI(contentGapPrompt, language),
askAI(channelAuditPrompt, language),
askAI(thumbnailPrompt, language),
  askAI(creatorKitPrompt, language),
  askAI(recommendedChannelsPrompt, language),
  askAI(opportunityPrompt, language),
  askAI(contentPlannerPrompt, language),
  askAI(aiThumbnailPrompt, language),
]);
const end = performance.now();
console.log(
  `🚀 AI generation took ${Math.round(end - start)}ms`
);
  console.log("========== AI RESPONSES ==========");
  console.log("REPORT:", report);
  console.log("IDEA:", idea);
  console.log("STRATEGY:", strategy);
  console.log("COMPETITION:", competition);
  console.log("TITLES:", titles);
  console.log("SEO:", seo);
  console.log("THUMBNAIL:", thumbnail);
  console.log("CREATOR KIT:", creatorKit);
  console.log("RECOMMENDED:", recommendedChannels);
  console.log("OPPORTUNITIES:", opportunities);
  console.log("==================================");

  const benchmarkData =
  safeObject(parseAIJson(report), {});

return {
  report: safeBenchmark(
    (benchmarkData as any).benchmark
  ),

  keywordIntelligence: safeObject<KeywordIntelligence>(
  (benchmarkData as any).keywordIntelligence,
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
),

  idea: safeArray(parseAIJson(idea)),

  strategy: safeArray(parseAIJson(strategy)),

  competition: safeObject<CompetitionAnalysis>(
  parseAIJson(competition),
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
),

  titles: safeArray(parseAIJson(titles)),

  seo: safeObject<SEOAnalysis>(
  parseAIJson(seo),
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
),

seoOptimizer: safeObject<SEOOptimizer>(
  parseAIJson(seoOptimizer),
  {
    betterTitle: "",
    betterDescription: "",
    tags: [],
    keywordCluster: [],
    searchIntent: "",
    rankingTips: [],
  }
),
contentGap: safeArray(
  parseAIJson(contentGap)
),
channelAudit: safeObject<ChannelAudit>(
  parseAIJson(channelAudit),
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
),

  thumbnail: safeArray(parseAIJson(thumbnail)),

  creatorKit: safeObject<CreatorKit>(
    parseAIJson(creatorKit),
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
  ),

  recommendedChannels: safeString(
    recommendedChannels
  ),

  opportunities: safeArray(
    parseAIJson(opportunities)
  ),

  contentPlanner: safeArray(
  parseAIJson(contentPlanner)
) as ContentPlanner[],

aiThumbnail: safeArray(
  parseAIJson(aiThumbnail)
) as AIThumbnail[],
};
}