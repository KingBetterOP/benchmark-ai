import { Video } from "./types";

export function getCompetition(video: Video) {
  const views = Number(video.statistics?.viewCount || 0);
  const subscribers = video.channel?.subscribers || 1;

  const ratio = views / subscribers;

  if (ratio >= 20) {
    return {
      text: "🔥 Easy Opportunity",
      color: "text-green-400",
    };
  }

  if (ratio >= 8) {
    return {
      text: "⚡ Medium Competition",
      color: "text-yellow-400",
    };
  }

  return {
    text: "🚨 High Competition",
    color: "text-red-400",
  };
}