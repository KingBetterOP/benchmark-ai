import { Video } from "./types";

export type CTREngineResult = {
  score: number;
  averageViews: number;
  highPerformers: number;
};

export function calculateCTREngineV2(
  videos: Video[]
): CTREngineResult {
  if (!videos.length) {
    return {
      score: 0,
      averageViews: 0,
      highPerformers: 0,
    };
  }

  const viewCounts = videos.map((video) =>
    Number(video.statistics?.viewCount ?? 0)
  );

  const averageViews =
    viewCounts.reduce((a, b) => a + b, 0) /
    viewCounts.length;

  const highPerformers = viewCounts.filter(
    (views) => views >= averageViews * 1.5
  ).length;

  let score = 4;

  if (averageViews >= 1_000_000) score += 3;
  else if (averageViews >= 300_000) score += 2;
  else score += 1;

  if (highPerformers >= 3) score += 3;
  else if (highPerformers >= 1) score += 2;
  else score += 1;

  return {
    score: Math.min(10, score),
    averageViews: Math.round(averageViews),
    highPerformers,
  };
}