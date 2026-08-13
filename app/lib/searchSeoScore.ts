import { Video } from "./types";

export function calculateSearchSEO(
  keyword: string,
  videos: Video[]
) {
  if (!videos.length) {
    return {
      score: 0,
      title: false,
      keyword: false,
      competition: false,
      volume: false,
    };
  }

  const averageViews =
    videos.reduce(
      (sum, video) =>
        sum + Number(video.statistics?.viewCount ?? 0),
      0
    ) / videos.length;

  let score = 50;

  const title =
    keyword.length >= 3 &&
    keyword.length <= 40;

  if (title) score += 10;

  const keywordUsage = true;
  score += 10;

  const lowCompetition =
    videos.length < 15;

  if (lowCompetition) score += 15;

  const highVolume =
    averageViews > 100000;

  if (highVolume) score += 15;

  return {
    score: Math.min(score, 100),
    title,
    keyword: keywordUsage,
    competition: lowCompetition,
    volume: highVolume,
  };
}