import { Video } from "./types";

export function calculateTrendingScore(videos: Video[]) {
  if (videos.length === 0) return 0;

  const recent = videos.filter((video) => {
    const days =
      (Date.now() -
        new Date(video.snippet.publishedAt).getTime()) /
      (1000 * 60 * 60 * 24);

    return days <= 30;
  }).length;

  const score = Math.round(
    (recent / videos.length) * 100
  );

  return score;
}