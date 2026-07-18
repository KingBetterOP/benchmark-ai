import { Video } from "./types";

export function predictCTR(video: Video) {
  const views = Number(video.statistics?.viewCount || 0);
  const likes = Number(video.statistics?.likeCount || 0);
  const comments = Number(video.statistics?.commentCount || 0);

  let ctr = 3;

  if (views >= 1_000_000) ctr += 2;
  if (likes >= 50_000) ctr += 2;
  if (comments >= 3_000) ctr += 1;

  return Math.min(ctr, 10).toFixed(1);
}