import { Video } from "./types";
import { getSuccessScore } from "./successScore";

export function rankVideos(
  videos: Video[],
  benchmarkScores: Record<string, number>
) {
  return [...videos].sort((a, b) => {
    const scoreA = getSuccessScore(
      a,
      benchmarkScores[a.id] ?? 50
    );

    const scoreB = getSuccessScore(
      b,
      benchmarkScores[b.id] ?? 50
    );

    return scoreB - scoreA;
  });
}