import { Video, Channel } from "./types";

/* ============================================================
   Dashboard Analytics Engine
   Benchmark AI Core v1
============================================================ */

export interface DashboardChannelStats {
  channel: Channel;

  appearances: number;

  averageViews: number;

  totalViews: number;
}

export interface DashboardStats {
  videoCount: number;

  totalViews: number;
  averageViews: number;
  highestViews: number;
  lowestViews: number;

  averageLikes: number;
  averageComments: number;
  engagementRate: number;

  averageDuration: number;
  longestDuration: number;
  shortestDuration: number;

  topChannel: DashboardChannelStats | null;

  latestUpload: Date | null;
  oldestUpload: Date | null;
  averageUploadAge: number;
}

/* ============================================================
   Safe Helpers
============================================================ */

function safeNumber(value: unknown): number {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return 0;
  }

  return num;
}

function safeAverage(total: number, count: number): number {
  if (count <= 0) {
    return 0;
  }

  return total / count;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/* ============================================================
   Duration Helpers
============================================================ */

/**
 * ISO8601 Duration
 * PT1H20M35S
 * PT15M
 * PT42S
 */

export function durationToSeconds(
  duration: string
): number {
  if (!duration) return 0;

  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) {
    return 0;
  }

  const hours = safeNumber(match[1]);
  const minutes = safeNumber(match[2]);
  const seconds = safeNumber(match[3]);

  return (
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}

export function secondsToDuration(
  totalSeconds: number
): string {
  const seconds = Math.max(
    0,
    Math.floor(totalSeconds)
  );

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }

  if (m > 0) {
    return `${m}m ${s}s`;
  }

  return `${s}s`;
}

/* ============================================================
   View Analytics
============================================================ */

export function getVideoCount(
  videos: Video[]
): number {
  return videos.length;
}

export function getTotalViews(
  videos: Video[]
): number {
  return videos.reduce((total, video) => {
    return (
      total +
      safeNumber(video.statistics?.viewCount)
    );
  }, 0);
}

export function getAverageViews(
  videos: Video[]
): number {
  return safeAverage(
    getTotalViews(videos),
    videos.length
  );
}

export function getHighestViews(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  return Math.max(
    ...videos.map((video) =>
      safeNumber(video.statistics?.viewCount)
    )
  );
}

export function getLowestViews(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  return Math.min(
    ...videos.map((video) =>
      safeNumber(video.statistics?.viewCount)
    )
  );
}

/* ============================================================
   Like / Comment Analytics
============================================================ */

export function getAverageLikes(
  videos: Video[]
): number {
  const total = videos.reduce((sum, video) => {
    return (
      sum +
      safeNumber(video.statistics?.likeCount)
    );
  }, 0);

  return safeAverage(total, videos.length);
}

export function getAverageComments(
  videos: Video[]
): number {
  const total = videos.reduce((sum, video) => {
    return (
      sum +
      safeNumber(video.statistics?.commentCount)
    );
  }, 0);

  return safeAverage(total, videos.length);
}

export function getEngagementRate(
  videos: Video[]
): number {
  const totalViews = getTotalViews(videos);

  if (totalViews === 0) {
    return 0;
  }

  const totalLikes = videos.reduce(
    (sum, video) =>
      sum +
      safeNumber(video.statistics?.likeCount),
    0
  );

  const totalComments = videos.reduce(
    (sum, video) =>
      sum +
      safeNumber(video.statistics?.commentCount),
    0
  );

  const rate =
    ((totalLikes + totalComments) /
      totalViews) *
    100;

  return clamp(rate, 0, 100);
}
/* ============================================================
   Duration Analytics
============================================================ */

export function getAverageDuration(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  const totalSeconds = videos.reduce((sum, video) => {
    return (
      sum +
      durationToSeconds(
        video.contentDetails.duration
      )
    );
  }, 0);

  return safeAverage(totalSeconds, videos.length);
}

export function getLongestDuration(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  return Math.max(
    ...videos.map((video) =>
      durationToSeconds(
        video.contentDetails.duration
      )
    )
  );
}

export function getShortestDuration(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  return Math.min(
    ...videos.map((video) =>
      durationToSeconds(
        video.contentDetails.duration
      )
    )
  );
}

/* ============================================================
   Channel Analytics
============================================================ */

export interface DashboardChannelStats {
  channel: Channel;

  appearances: number;

  totalViews: number;

  averageViews: number;
}

export function getChannelCount(
  videos: Video[]
): number {
  return new Set(
    videos.map((video) => video.snippet.channelId)
  ).size;
}

export function getTotalSubscribers(
  videos: Video[]
): number {
  return videos.reduce((sum, video) => {
    return (
      sum +
      safeNumber(
        video.channel?.subscribers
      )
    );
  }, 0);
}

export function getAverageSubscribers(
  videos: Video[]
): number {
  return safeAverage(
    getTotalSubscribers(videos),
    videos.length
  );
}

export function getTopChannel(
  videos: Video[]
): DashboardChannelStats | null {
  if (videos.length === 0) {
    return null;
  }

  const map = new Map<
    string,
    DashboardChannelStats
  >();

  for (const video of videos) {
    if (!video.channel) {
      continue;
    }

    const key = video.snippet.channelId;

    const current = map.get(key);

    const views = safeNumber(
      video.statistics.viewCount
    );

    if (!current) {
      map.set(key, {
        channel: video.channel,
        appearances: 1,
        totalViews: views,
        averageViews: views,
      });

      continue;
    }

    current.appearances += 1;
    current.totalViews += views;
    current.averageViews =
      current.totalViews /
      current.appearances;
  }

  if (map.size === 0) {
    return null;
  }

  return [...map.values()].sort(
    (a, b) =>
      b.appearances - a.appearances
  )[0];
}

/* ============================================================
   Upload Analytics
============================================================ */

export function getLatestUpload(
  videos: Video[]
): Date | null {
  if (videos.length === 0) {
    return null;
  }

  return videos.reduce((latest, video) => {
    const current = new Date(
      video.snippet.publishedAt
    );

    if (!latest) {
      return current;
    }

    return current > latest
      ? current
      : latest;
  }, null as Date | null);
}

export function getOldestUpload(
  videos: Video[]
): Date | null {
  if (videos.length === 0) {
    return null;
  }

  return videos.reduce((oldest, video) => {
    const current = new Date(
      video.snippet.publishedAt
    );

    if (!oldest) {
      return current;
    }

    return current < oldest
      ? current
      : oldest;
  }, null as Date | null);
}

export function getAverageUploadAge(
  videos: Video[]
): number {
  if (videos.length === 0) {
    return 0;
  }

  const now = Date.now();

  const totalDays = videos.reduce(
    (sum, video) => {
      const uploaded =
        new Date(
          video.snippet.publishedAt
        ).getTime();

      const days =
        (now - uploaded) /
        (1000 * 60 * 60 * 24);

      return sum + days;
    },
    0
  );

  return safeAverage(
    totalDays,
    videos.length
  );
}
/* ============================================================
   Formatting Helpers
============================================================ */

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString();
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function daysAgo(date: Date | null): number {
  if (!date) {
    return 0;
  }

  const diff =
    Date.now() - date.getTime();

  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
}

/* ============================================================
   Dashboard Statistics
============================================================ */

export function getDashboardStats(
  videos: Video[]
): DashboardStats {
  const videoCount = getVideoCount(videos);

  const totalViews = getTotalViews(videos);

  const averageViews =
    getAverageViews(videos);

  const highestViews =
    getHighestViews(videos);

  const lowestViews =
    getLowestViews(videos);

  const averageLikes =
    getAverageLikes(videos);

  const averageComments =
    getAverageComments(videos);

  const engagementRate =
    getEngagementRate(videos);

  const averageDuration =
    getAverageDuration(videos);

  const longestDuration =
    getLongestDuration(videos);

  const shortestDuration =
    getShortestDuration(videos);

  const topChannel =
    getTopChannel(videos);

  const latestUpload =
    getLatestUpload(videos);

  const oldestUpload =
    getOldestUpload(videos);

  const averageUploadAge =
    getAverageUploadAge(videos);

  return {
    videoCount,

    totalViews,
    averageViews,
    highestViews,
    lowestViews,

    averageLikes,
    averageComments,
    engagementRate,

    averageDuration,
    longestDuration,
    shortestDuration,

    topChannel,

    latestUpload,
    oldestUpload,
    averageUploadAge,
  };
}

/* ============================================================
   Dashboard Summary
============================================================ */

export function getDashboardSummary(
  videos: Video[]
) {
  const stats =
    getDashboardStats(videos);

  return {
    totalVideos: stats.videoCount,

    totalViews: formatNumber(
      stats.totalViews
    ),

    averageViews: formatNumber(
      stats.averageViews
    ),

    highestViews: formatNumber(
      stats.highestViews
    ),

    lowestViews: formatNumber(
      stats.lowestViews
    ),

    averageLikes: formatNumber(
      stats.averageLikes
    ),

    averageComments: formatNumber(
      stats.averageComments
    ),

    engagementRate:
      formatPercentage(
        stats.engagementRate
      ),

    averageDuration:
      secondsToDuration(
        stats.averageDuration
      ),

    longestDuration:
      secondsToDuration(
        stats.longestDuration
      ),

    shortestDuration:
      secondsToDuration(
        stats.shortestDuration
      ),

    latestUploadDaysAgo:
      daysAgo(
        stats.latestUpload
      ),

    oldestUploadDaysAgo:
      daysAgo(
        stats.oldestUpload
      ),
  };
}