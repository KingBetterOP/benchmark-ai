import type { Video } from "./types";
export function formatDuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return duration;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}




export function calculateBenchmarkScore(
  video: Video
) {
  const views = Number(video.statistics?.viewCount || 0);

  const subscribers = Number(
    video.channel?.subscribers ?? 1
  );

  const likes = Number(video.statistics?.likeCount || 0);
  const comments = Number(video.statistics?.commentCount || 0);

  const published = new Date(video.snippet.publishedAt);

  const days =
    (Date.now() - published.getTime()) /
    (1000 * 60 * 60 * 24);

  const ratio = views / Math.max(subscribers, 1);

  let score = 0;

  // 조회수
  if (views >= 1000000) score += 30;
  else if (views >= 300000) score += 25;
  else if (views >= 100000) score += 20;
  else if (views >= 30000) score += 15;
  else score += 10;

  // 성장성
  if (ratio >= 20) score += 30;
  else if (ratio >= 10) score += 25;
  else if (ratio >= 5) score += 20;
  else if (ratio >= 2) score += 15;
  else score += 10;

  // 최신성
  if (days <= 30) score += 20;
  else if (days <= 90) score += 15;
  else if (days <= 180) score += 10;
  else if (days <= 365) score += 5;

  // 좋아요
  const likeRate = likes / Math.max(views, 1);

  if (likeRate >= 0.05) score += 10;
  else if (likeRate >= 0.03) score += 7;
  else if (likeRate >= 0.01) score += 5;

  // 댓글
  const commentRate = comments / Math.max(views, 1);

  if (commentRate >= 0.01) score += 10;
  else if (commentRate >= 0.005) score += 7;
  else if (commentRate >= 0.001) score += 5;

  return Math.min(score, 100);
}