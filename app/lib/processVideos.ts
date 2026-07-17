import { calculateBenchmarkScore } from "./videoUtils";
import { Video, Channel } from "./types";

export function processVideos(
  items: Video[],
  excludeShorts: boolean,
  min10Minutes: boolean
) {
  const totalViews = items.reduce(
    (sum, video) => sum + Number(video.statistics?.viewCount || 0),
    0
  );

  const averageViews =
    items.length > 0 ? Math.round(totalViews / items.length) : 0;

  const results = items.filter((video) => {
    const duration = video.contentDetails?.duration ?? "";

    const match = duration.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    const hours = Number(match?.[1] || 0);
    const minutes = Number(match?.[2] || 0);
    const seconds = Number(match?.[3] || 0);

    const totalSeconds =
      hours * 3600 + minutes * 60 + seconds;

    if (excludeShorts && totalSeconds < 180) {
      return false;
    }

    if (min10Minutes && totalSeconds < 600) {
      return false;
    }

    return true;
  });
  results.sort(
  (a, b) =>
    calculateBenchmarkScore(b) -
    calculateBenchmarkScore(a)
);

  const topVideos = results.slice(0, 5);

  const channelMap = new Map<string, Channel>();

  results.forEach((video) => {
    if (video.channel) {
      channelMap.set(video.channel.name, video.channel);
    }
  });

  const channels = [...channelMap.values()];

  return {
    results,
    averageViews,
    topVideos,
    channels,
  };
}