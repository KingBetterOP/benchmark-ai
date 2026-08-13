import { calculateBenchmarkScore } from "./videoUtils";
import { Video, Channel, ProcessedBenchmarkData } from "./types";

export function processVideos(
  items: Video[],
  excludeShorts: boolean,
  min10Minutes: boolean
): ProcessedBenchmarkData {
  // -------------------------------------------------------
  // 1. Filter videos
  // -------------------------------------------------------

  const filteredResults = items.filter((video) => {
    const duration = video.contentDetails?.duration ?? "";

    const match = duration.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
    );

    const hours = Number(match?.[1] || 0);
    const minutes = Number(match?.[2] || 0);
    const seconds = Number(match?.[3] || 0);

    const totalSeconds =
      hours * 3600 +
      minutes * 60 +
      seconds;

    // Shorts 제외
    if (excludeShorts && totalSeconds < 180) {
      return false;
    }

    // 10분 미만 제외
    if (min10Minutes && totalSeconds < 600) {
      return false;
    }

    return true;
  });

  // -------------------------------------------------------
  // 2. Remove duplicate videos
  // -------------------------------------------------------

  const uniqueResults = Array.from(
    new Map(
      filteredResults.map((video) => [
        video.id,
        video,
      ])
    ).values()
  );

  // -------------------------------------------------------
  // 3. Calculate average views
  // -------------------------------------------------------

  const totalViews = uniqueResults.reduce(
    (sum, video) =>
      sum +
      Number(video.statistics?.viewCount || 0),
    0
  );

  const averageViews =
    uniqueResults.length > 0
      ? Math.round(
          totalViews / uniqueResults.length
        )
      : 0;

  // -------------------------------------------------------
  // 4. Rank videos
  // -------------------------------------------------------

  uniqueResults.sort(
    (a, b) =>
      calculateBenchmarkScore(b) -
      calculateBenchmarkScore(a)
  );

  // -------------------------------------------------------
  // 5. Top 5 videos
  // -------------------------------------------------------

  const topVideos = uniqueResults.slice(0, 5);

  // -------------------------------------------------------
  // 6. Build unique channel list
  // -------------------------------------------------------

  const channelMap = new Map<string, Channel>();

  uniqueResults.forEach((video) => {
    if (video.channel) {
      channelMap.set(
        video.channel.name,
        video.channel
      );
    }
  });

  const channels = [
    ...channelMap.values(),
  ];

  // -------------------------------------------------------
  // 7. Return processed benchmark data
  // -------------------------------------------------------

  return {
    results: uniqueResults,
    averageViews,
    topVideos,
    channels,
  };
}