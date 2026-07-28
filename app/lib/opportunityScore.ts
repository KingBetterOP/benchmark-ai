import { Video } from "./types";

export type OpportunityResult = {
  score: number;
  competition: "LOW" | "MEDIUM" | "HIGH";
  viralChance: "LOW" | "MEDIUM" | "HIGH";
  growth: "LOW" | "GOOD" | "EXCELLENT";
  recommendation: string;
};

export function calculateOpportunityScore(
  videos: Video[]
): OpportunityResult {
  if (videos.length === 0) {
    return {
      score: 0,
      competition: "LOW",
      viralChance: "LOW",
      growth: "LOW",
      recommendation: "검색 결과가 없습니다.",
    };
  }

  const avgViews =
    videos.reduce(
      (sum, video) =>
        sum + Number(video.statistics?.viewCount ?? 0),
      0
    ) / videos.length;

  const avgRatio =
    videos.reduce((sum, video) => {
      const subs = video.channel?.subscribers || 1;
      const views = Number(video.statistics?.viewCount || 0);

      return sum + views / subs;
    }, 0) / videos.length;
    const uniqueChannels = new Set(
  videos.map((video) => video.snippet.channelId)
).size;

const diversityRatio = uniqueChannels / videos.length;
const recentVideos = videos.filter((video) => {
  const published = new Date(video.snippet.publishedAt);
  const days =
    (Date.now() - published.getTime()) /
    (1000 * 60 * 60 * 24);

  return days <= 30;
}).length;

const freshnessRatio = recentVideos / videos.length;
const views = videos.map((video) =>
  Number(video.statistics?.viewCount ?? 0)
);

const average =
  views.reduce((a, b) => a + b, 0) / views.length;

const variance =
  views.reduce((sum, value) => {
    return sum + Math.pow(value - average, 2);
  }, 0) / views.length;

const standardDeviation = Math.sqrt(variance);

const stability =
  average === 0 ? 0 : 1 - standardDeviation / average;

  let score = 40;

  if (avgViews > 1_000_000) score += 20;
  else if (avgViews > 300_000) score += 15;
  else if (avgViews > 100_000) score += 10;

  if (avgRatio > 20) score += 25;
  else if (avgRatio > 10) score += 15;
  else if (avgRatio > 5) score += 8;
  if (diversityRatio > 0.8) score += 10;
else if (diversityRatio > 0.6) score += 5;
if (freshnessRatio > 0.6) score += 10;
else if (freshnessRatio > 0.3) score += 5;
if (stability > 0.7) score += 10;
else if (stability > 0.5) score += 5;

  score = Math.min(score, 100);

  const competition =
    avgRatio > 20
      ? "LOW"
      : avgRatio > 8
      ? "MEDIUM"
      : "HIGH";

  const viralChance =
    score >= 85
      ? "HIGH"
      : score >= 65
      ? "MEDIUM"
      : "LOW";

  const growth =
  score >= 90 && freshnessRatio > 0.5
    ? "EXCELLENT"
    : score >= 70
    ? "GOOD"
    : "LOW";

  let recommendation = "";

if (score >= 90) {
  recommendation =
    "🔥 지금이 가장 좋은 진입 시점입니다. 트렌드와 성장성이 모두 높습니다.";
} else if (score >= 75) {
  recommendation =
    "✅ 충분히 도전할 가치가 있는 키워드입니다.";
} else if (score >= 60) {
  recommendation =
    "⚠️ 콘텐츠 차별화 전략이 필요합니다.";
} else {
  recommendation =
    "❌ 현재는 경쟁이 높거나 성장성이 낮습니다.";
}

  return {
    score,
    competition,
    viralChance,
    growth,
    recommendation,
  };
}