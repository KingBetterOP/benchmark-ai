import { Video } from "./types";

export function calculateThumbnailScore(video: Video) {
  const views = Number(video.statistics?.viewCount ?? 0);
  const likes = Number(video.statistics?.likeCount ?? 0);
  const comments = Number(video.statistics?.commentCount ?? 0);

  let score = 50;

  if (views > 100000) score += 15;
  if (likes > 5000) score += 15;
  if (comments > 500) score += 10;
  if (video.snippet.title.length < 70) score += 10;

  return Math.min(score, 100);
}