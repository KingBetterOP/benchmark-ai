import { Video } from "./types";

export function calculateCompetitionEngine(
  videos: Video[]
) {
  if (videos.length === 0) {
    return {
      score: 0,
      density: 0,
      avgSubscribers: 0,
      uploadFrequency: 0,
      viewVelocity: 0,
      barrier: "LOW",
    };
  }

  const totalViews = videos.reduce(
    (sum, video) =>
      sum + Number(video.statistics?.viewCount ?? 0),
    0
  );

  const averageViews = totalViews / videos.length;

  const uploadFrequency = Math.min(
    100,
    videos.length * 5
  );

  const density = Math.min(
    100,
    averageViews / 100000
  );

  const viewVelocity = Math.min(
    100,
    averageViews / 50000
  );

  const score = Math.round(
    density * 0.4 +
      uploadFrequency * 0.3 +
      viewVelocity * 0.3
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
    avgSubscribers: 0,
    uploadFrequency: Math.round(uploadFrequency),
    viewVelocity: Math.round(viewVelocity),
    barrier,
  };
}