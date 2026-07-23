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

Return ONLY valid JSON.

{
  "score": 0,
  "overview": {
    "avgViews": "",
    "avgDuration": "",
    "uploadFrequency": "",
    "bestVideo": ""
  },
  "insights": [],
  "actionPlan": [],
  "analysis": ""
}

ONLY return JSON.
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

Return ONLY JSON.

{
  "competitionScore":80,
  "difficulty":"Medium",
  "successProbability":70,
  "recommendation":"Good",
  "strengths":[],
  "weaknesses":[]
}
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