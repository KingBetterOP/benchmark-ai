import { Video } from "./types";

export function calculateCompetitionEngineV2(
  videos: Video[]
) {
  if (!videos.length) {
    return {
      score: 0,
      density: 0,
      engagement: 0,
      freshness: 0,
      velocity: 0,
      barrier: "LOW",
    };
  }

  const totalViews = videos.reduce(
    (sum, video) =>
      sum + Number(video.statistics?.viewCount ?? 0),
    0
  );

  const totalLikes = videos.reduce(
    (sum, video) =>
      sum + Number(video.statistics?.likeCount ?? 0),
    0
  );

  const averageViews = totalViews / videos.length;

  const engagement =
    totalViews === 0
      ? 0
      : (totalLikes / totalViews) * 100;

  const density = Math.min(
    100,
    averageViews / 100000
  );

  const freshness =
    Math.min(100, videos.length * 8);

  const velocity =
    Math.min(
      100,
      averageViews / 50000
    );

  const score = Math.round(
    density * 0.30 +
      engagement * 0.25 +
      freshness * 0.20 +
      velocity * 0.25
  );

  const barrier =
    score >= 80
      ? "HIGH"
      : score >= 60
      ? "MEDIUM"
      : "LOW";

  return {
    score,
    density: Math.round(density),
    engagement: Number(
      engagement.toFixed(1)
    ),
    freshness,
    velocity: Math.round(velocity),
    barrier,
  };
}