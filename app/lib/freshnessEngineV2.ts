import { Video } from "./types";

export type FreshnessEngineResult = {
  score: number;
  last7Days: number;
  last30Days: number;
  last90Days: number;
};

export function calculateFreshnessEngineV2(
  videos: Video[]
): FreshnessEngineResult {
  if (!videos.length) {
    return {
      score: 0,
      last7Days: 0,
      last30Days: 0,
      last90Days: 0,
    };
  }

  const now = Date.now();

  let last7Days = 0;
  let last30Days = 0;
  let last90Days = 0;

  videos.forEach((video) => {
    const published = new Date(
      video.snippet.publishedAt
    ).getTime();

    const age =
      (now - published) /
      (1000 * 60 * 60 * 24);

    if (age <= 7) last7Days++;
    if (age <= 30) last30Days++;
    if (age <= 90) last90Days++;
  });

  let score = 0;

  score += Math.min(3, last7Days);
  score += Math.min(4, Math.floor(last30Days / 2));
  score += Math.min(3, Math.floor(last90Days / 3));

  return {
    score: Math.min(10, score),
    last7Days,
    last30Days,
    last90Days,
  };
}