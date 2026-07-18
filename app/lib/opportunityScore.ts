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

  let score = 40;

  if (avgViews > 1_000_000) score += 20;
  else if (avgViews > 300_000) score += 15;
  else if (avgViews > 100_000) score += 10;

  if (avgRatio > 20) score += 25;
  else if (avgRatio > 10) score += 15;
  else if (avgRatio > 5) score += 8;

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
    score >= 90
      ? "EXCELLENT"
          : score >= 70
    ? "GOOD"
    : "LOW";

  const recommendation =
    score >= 85
      ? "지금 진입하기 좋은 키워드입니다."
      : score >= 65
      ? "충분히 도전할 가치가 있습니다."
      : "경쟁이 치열하므로 차별화 전략이 필요합니다.";

  return {
    score,
    competition,
    viralChance,
    growth,
    recommendation,
  };
}