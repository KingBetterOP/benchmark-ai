import type {
  Video,
  Channel,
} from "./types";

export function createBenchmarkPrompt(
  keyword: string,
  rankedVideos: Video[]
) {
  return `
You are Benchmark AI.

Analyze these YouTube videos.

Keyword:
${keyword}

Videos:
${rankedVideos
  .map(
    (v) => `
Title: ${v.snippet.title}
Views: ${v.statistics.viewCount}
Channel: ${v.snippet.channelTitle}
`
  )
  .join("\n")}
  Use the provided videos as evidence.

  Never fabricate statistics that contradict the provided data.

Do not guess blindly.

Base every score on:
- View counts
- Video titles
- Competition level
- Channel quality
- Upload patterns

When estimating CTR, RPM, revenue and success probability, use realistic YouTube ranges instead of random numbers.

Return ONLY valid JSON.

{
  "benchmark": {
    "score": 0,

    "overview": {
      "avgViews": "",
      "avgDuration": "",
      "uploadFrequency": "",
      "bestVideo": ""
    },

    "insights": [],

    "actionPlan": [],

    "analysis": "",

    "prediction": {
      "successProbability": 0,
      "expectedViews": "",
      "expectedCTR": "",
      "expectedRPM": "",
      "estimatedRevenue": ""
    },

    "seo": {
      "score": 0,
      "titleScore": 0,
      "keywordScore": 0,
      "descriptionScore": 0
    },

    "audience": {
      "retention": 0,
      "engagement": 0,
      "target": ""
    },

    "uploadStrategy": {
      "bestDay": "",
      "bestTime": "",
      "recommendedLength": ""
    },

    "risk": {
  "level": "",
  "score": 0,
  "reasons": []
}
  },

  "keywordIntelligence": {
    "difficulty": 0,
    "opportunity": 0,
    "trend": "",
    "demand": "",
    "uploadTime": "",
    "audience": "",
    "expectedViews": "",
    "expectedCTR": "",
    "estimatedRPM": "",
    "estimatedRevenue": "",
    "recommendation": "",
    "confidence": 0
  }
}

Analyze the YouTube videos like a senior YouTube strategist.

Do not invent impossible numbers.

Estimate realistic CTR, RPM, revenue and success probability based on the provided videos.

Provide practical action plans.

Return ONLY valid JSON.

No markdown.

No explanation.
`;
}
export function createSEOPrompt(
  keyword: string
) {
  return `
Keyword: ${keyword}

You are an elite YouTube SEO expert.

Analyze this keyword for YouTube SEO.

Return ONLY valid JSON.

{
  "overallScore": 0,

  "titleScore": 0,

  "descriptionScore": 0,

  "keywordDensity": 0,

  "rankingProbability": 0,

  "recommendedKeywords": [],

  "missingKeywords": [],

  "suggestions": []
}

Do not use markdown.

Return ONLY JSON.
`;
}
export function createChannelAuditPrompt(
  channelName: string
) {
  return `
Channel:
${channelName}

You are an elite YouTube consultant.

Analyze this channel.

Return ONLY valid JSON.

{
  "overallScore":0,

  "niche":"",

  "uploadFrequency":"",

  "titleStyle":"",

  "thumbnailStyle":"",

  "strengths":[],

  "weaknesses":[],

  "opportunities":[],

  "estimatedCTR":"",

  "estimatedRPM":"",

  "growthPotential":"",

  "recommendation":""
}

Return ONLY JSON.
`;
}
export function createSEOOptimizerPrompt(
  keyword: string
) {
  return `
Keyword:
${keyword}

You are the world's best YouTube SEO strategist.

Optimize this keyword for maximum YouTube ranking.

Return ONLY valid JSON.

{
  "betterTitle": "",

  "betterDescription": "",

  "tags": [],

  "keywordCluster": [],

  "searchIntent": "",

  "rankingTips": []
}

Do not use markdown.

Return ONLY JSON.
`;
}

export function createIdeaPrompt(keyword: string) {
  return `
Keyword: ${keyword}

Generate 10 YouTube content ideas.

Return ONLY JSON.

[
  {
    "title":"",
    "expectedViews":"",
    "difficulty":"",
    "trendScore":95,
    "reason":"",
    "thumbnail":""
  }
]
`;
}

export function createStrategyPrompt(keyword: string) {
  return `
Keyword: ${keyword}

Return ONLY JSON.

[
  {
    "title":"",
    "impact":90,
    "difficulty":"Easy",
    "description":""
  }
]
`;
}

export function createCompetitionPrompt(keyword: string) {
  return `
Keyword: ${keyword}

You are an expert YouTube competitor analyst.

Analyze the keyword competition realistically.

Use typical YouTube market patterns.

Return ONLY valid JSON.

{
  "competitionScore":80,

  "difficulty":"Medium",

  "successProbability":70,

  "recommendation":"Good",

  "strengths":[],

  "weaknesses":[],

  "marketSaturation":"Medium",

  "barrierToEntry":"Low",

  "contentQuality":88,

  "thumbnailQuality":91,

  "titleQuality":86,

  "uploadFrequency":"Daily",

  "opportunityScore":84,

  "opportunities":[]
}

Do not use markdown.

Return ONLY JSON.
`;
}

export function createTitlePrompt(keyword: string) {
  return `
Keyword: ${keyword}

Return ONLY JSON.

[
  {
    "title":"",
    "ctr":9,
    "seo":90,
    "emotion":90
  }
]
`;
}

export function createRecommendedChannelsPrompt(
  keyword: string,
  channels: Channel[]
) {
  return `
Keyword: ${keyword}

Recommend the best 3 channels.

${channels
  .map(
    (channel) => `
Channel: ${channel.name}
Subscribers: ${channel.subscribers}
Videos: ${channel.videos}
Views: ${channel.views}
`
  )
  .join("\n")}

Return ONLY text.
`;
}
export function createOpportunityPrompt() {
  return `
You are a YouTube growth expert.

Recommend the 5 best YouTube opportunities RIGHT NOW.

Prioritize low competition and high growth opportunities.

Return ONLY valid JSON.

[
  {
    "keyword":"...",
    "competition":"Low",
    "growth":"+180%",
    "expectedViews":"250K",
    "reason":"..."
  }
]
`;
}
export function createThumbnailPrompt(keyword: string) {
  return `
Keyword: ${keyword}

Generate 5 YouTube thumbnail ideas.

Return ONLY JSON.

[
  {
    "title":"",
    "visual":"",
    "emotion":"",
    "colors":""
  }
]
`;
}
export function createCreatorKitPrompt(
  keyword: string
) {
  return `
Keyword: ${keyword}

You are an elite YouTube strategist.

Generate a complete Creator Kit.

Return ONLY valid JSON.

{
  "hook": "",

  "script": "",

  "description": "",

  "hashtags": [
  "#youtube",
  "#seo",
  "#viral"
]

  "thumbnailPrompt":
"Close-up surprised face, bright yellow background, huge red arrow, cinematic lighting, ultra realistic",

  "callToAction": "",

  "communityPost": "",

  "shortsScript": "",

  "instagramCaption": "",

  "twitterPost": ""
}

Do not use markdown.

Return ONLY JSON.

Every field must be completed.

Never leave empty strings.

Use SEO best practices.

Think like a YouTube creator with 10 million subscribers.
`;
}
export function createContentGapPrompt(
  keyword: string
) {
  return `
Keyword:
${keyword}

You are a YouTube strategist.

Find 10 content gaps.

Return ONLY JSON.

[
  {
    "keyword":"",
    "opportunityScore":0,
    "competition":"",
    "reason":"",
    "estimatedViews":"",
    "contentIdea":""
  }
]

No markdown.

Return ONLY JSON.
`;
}
export function createContentPlannerPrompt(
  keyword: string
) {
  return `
Keyword:
${keyword}

You are an elite YouTube strategist.

Create a practical 30-day YouTube content plan.

Return ONLY valid JSON.

[
  {
    "day": 1,
    "title": "",
    "goal": "",
    "targetViews": "",
    "difficulty": "",
    "reason": ""
  }
]

Rules:
- Generate 30 items.
- Each day should build naturally from the previous one.
- Mix beginner, trending and evergreen content.
- Keep titles realistic for YouTube.
- Return ONLY JSON.
`;
}
export function createAIThumbnailPrompt(
  keyword: string
) {
  return `
Keyword:
${keyword}

You are the world's best YouTube thumbnail designer.

Generate 5 thumbnail concepts.

Return ONLY valid JSON.

[
  {
    "prompt":"",
    "style":"",
    "text":"",
    "colors":[],
    "composition":"",
    "emotion":""
  }
]

No markdown.

Return ONLY JSON.
`;
}