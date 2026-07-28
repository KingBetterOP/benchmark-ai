import { Video } from "./types";

export function calculateSEOScore(video: Video) {
  let score = 50;

  const title = video.snippet.title;

  if (title.length >= 40) score += 10;

  if (title.length <= 70) score += 10;

  if (
    video.snippet.description &&
    video.snippet.description.length > 100
  ) {
    score += 10;
  }

  if (
    Number(video.statistics?.commentCount ?? 0) > 100
  ) {
    score += 10;
  }

  if (
    Number(video.statistics?.likeCount ?? 0) > 1000
  ) {
    score += 10;
  }

  return Math.min(score, 100);
}