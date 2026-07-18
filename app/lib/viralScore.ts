import { Video } from "./types";

export function calculateViralScore(video: Video): number {
  const views = Number(video.statistics?.viewCount ?? 0);
  const likes = Number(video.statistics?.likeCount ?? 0);
  const comments = Number(video.statistics?.commentCount ?? 0);

  let score = 0;

  if (views >= 10000000) score += 40;
  else if (views >= 1000000) score += 32;
  else if (views >= 500000) score += 25;
  else if (views >= 100000) score += 18;
  else score += 10;

  if (likes >= 100000) score += 25;
  else if (likes >= 50000) score += 20;
  else if (likes >= 10000) score += 15;
  else score += 8;

  if (comments >= 10000) score += 20;
  else if (comments >= 3000) score += 15;
  else if (comments >= 500) score += 10;
  else score += 5;

  return Math.min(score, 100);
}