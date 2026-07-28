import { Video } from "./types";

export function calculateRevenue(videos: Video[]) {
  if (videos.length === 0) {
    return {
      low: 0,
      average: 0,
      high: 0,
    };
  }

  const avgViews =
    videos.reduce(
      (sum, video) =>
        sum + Number(video.statistics?.viewCount ?? 0),
      0
    ) / videos.length;

  return {
    low: Math.round((avgViews / 1000) * 1),
    average: Math.round((avgViews / 1000) * 3),
    high: Math.round((avgViews / 1000) * 8),
  };
}