import { Video } from "./types";

export type GapEngineResult = {
  score: number;
  lowCompetitionVideos: number;
  averageViews: number;
  opportunity: "HIGH" | "MEDIUM" | "LOW";
};

export function calculateGapEngineV2(
  videos: Video[]
): GapEngineResult {
  if (!videos.length) {
    return {
      score: 0,
      lowCompetitionVideos: 0,
      averageViews: 0,
      opportunity: "LOW",
    };
  }

  const averageViews =
    videos.reduce(
      (sum, video) =>
        sum +
        Number(video.statistics?.viewCount ?? 0),
      0
    ) / videos.length;

  const lowCompetitionVideos =
    videos.filter(
      (video) =>
        Number(video.statistics?.viewCount ?? 0) <
        averageViews
    ).length;

  const ratio =
    lowCompetitionVideos / videos.length;

  const score = Math.round(ratio * 20);

  const opportunity =
    score >= 14
      ? "HIGH"
      : score >= 8
      ? "MEDIUM"
      : "LOW";

  return {
    score,
    lowCompetitionVideos,
    averageViews: Math.round(averageViews),
    opportunity,
  };
}