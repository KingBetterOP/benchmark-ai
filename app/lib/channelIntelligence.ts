import { Video } from "./types";

export function calculateChannelIntelligence(videos: Video[]) {
  if (!videos.length) {
    return {
      consistency: 0,
      averageViews: 0,
      uploadRate: "Unknown",
      grade: "N/A",
    };
  }

  const totalViews = videos.reduce(
    (sum, video) => sum + Number(video.statistics?.viewCount ?? 0),
    0
  );

  const averageViews = Math.round(totalViews / videos.length);

  let consistency = 100;

  if (videos.length < 10) consistency -= 20;
  if (averageViews < 10000) consistency -= 20;
  if (averageViews < 1000) consistency -= 20;

  consistency = Math.max(0, consistency);

  const grade =
    consistency >= 90
      ? "A+"
      : consistency >= 80
      ? "A"
      : consistency >= 70
      ? "B"
      : consistency >= 60
      ? "C"
      : "D";

  return {
    consistency,
    averageViews,
    uploadRate: "Active",
    grade,
  };
}