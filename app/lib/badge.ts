import { Video } from "./types";

export function getNativeBadge(video: Video) {
  const views = Number(video.statistics?.viewCount || 0);

  const subscribers = Number(
  video.channel?.subscribers ?? 1
);

  const ratio = views / Math.max(subscribers, 1);

  const published = new Date(video.snippet.publishedAt);

  const days =
    (Date.now() - published.getTime()) /
    (1000 * 60 * 60 * 24);

  if (ratio >= 20 && days <= 30) {
    return {
      label: "🚀 급상승",
      color: "text-green-600",
    };
  }

  if (ratio >= 10) {
    return {
      label: "💎 숨은 보석",
      color: "text-blue-600",
    };
  }

  if (views >= 1000000) {
    return {
      label: "🔥 바이럴",
      color: "text-red-600",
    };
  }

  return {
    label: "📈 성장형",
    color: "text-yellow-600",
  };
}