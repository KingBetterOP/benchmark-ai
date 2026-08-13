import type { Video } from "./types";

/* =========================================================
   DURATION
========================================================= */

export function formatDuration(duration: string) {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return duration;

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(value: unknown) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

/* =========================================================
   DAYS SINCE PUBLISHED
========================================================= */

function getDaysSincePublished(
  publishedAt: string
) {
  const publishedTime =
    new Date(publishedAt).getTime();

  if (!Number.isFinite(publishedTime)) {
    return 3650;
  }

  const difference =
    Date.now() - publishedTime;

  if (difference <= 0) {
    return 0;
  }

  return (
    difference /
    (1000 * 60 * 60 * 24)
  );
}

/* =========================================================
   BENCHMARK SCORE
========================================================= */

export function calculateBenchmarkScore(
  video: Video
) {
  const views = safeNumber(
    video.statistics?.viewCount
  );

  const likes = safeNumber(
    video.statistics?.likeCount
  );

  const comments = safeNumber(
    video.statistics?.commentCount
  );

  const subscribers = safeNumber(
    video.channel?.subscribers
  );

  const days =
    getDaysSincePublished(
      video.snippet?.publishedAt ?? ""
    );

  /* =======================================================
     1. VIEW PERFORMANCE — 30 POINTS
  ======================================================= */

  let viewScore = 0;

  if (views >= 1_000_000) {
    viewScore = 30;
  } else if (views >= 300_000) {
    viewScore = 26;
  } else if (views >= 100_000) {
    viewScore = 22;
  } else if (views >= 30_000) {
    viewScore = 18;
  } else if (views >= 10_000) {
    viewScore = 14;
  } else if (views >= 3_000) {
    viewScore = 10;
  } else {
    viewScore = 5;
  }

  /* =======================================================
     2. SUBSCRIBER EFFICIENCY — 30 POINTS
  ======================================================= */

  let subscriberEfficiencyScore = 0;

  if (subscribers > 0) {
    const viewToSubscriberRatio =
      views / subscribers;

    if (viewToSubscriberRatio >= 20) {
      subscriberEfficiencyScore = 30;
    } else if (
      viewToSubscriberRatio >= 10
    ) {
      subscriberEfficiencyScore = 26;
    } else if (
      viewToSubscriberRatio >= 5
    ) {
      subscriberEfficiencyScore = 22;
    } else if (
      viewToSubscriberRatio >= 2
    ) {
      subscriberEfficiencyScore = 18;
    } else if (
      viewToSubscriberRatio >= 1
    ) {
      subscriberEfficiencyScore = 14;
    } else if (
      viewToSubscriberRatio >= 0.5
    ) {
      subscriberEfficiencyScore = 10;
    } else {
      subscriberEfficiencyScore = 5;
    }
  } else {
    /*
     * Subscriber data가 없으면
     * 추정치를 만들어 점수를 부풀리지 않는다.
     */
    subscriberEfficiencyScore = 0;
  }

  /* =======================================================
     3. RECENCY — 15 POINTS
  ======================================================= */

  let recencyScore = 0;

  if (days <= 7) {
    recencyScore = 15;
  } else if (days <= 30) {
    recencyScore = 13;
  } else if (days <= 90) {
    recencyScore = 11;
  } else if (days <= 180) {
    recencyScore = 8;
  } else if (days <= 365) {
    recencyScore = 5;
  } else {
    recencyScore = 2;
  }

  /* =======================================================
     4. ENGAGEMENT — 15 POINTS
  ======================================================= */

  let engagementScore = 0;

  if (views > 0) {
    const likeRate =
      likes / views;

    const commentRate =
      comments / views;

    /* Like engagement — 9 points */

    if (likeRate >= 0.05) {
      engagementScore += 9;
    } else if (likeRate >= 0.03) {
      engagementScore += 7;
    } else if (likeRate >= 0.01) {
      engagementScore += 5;
    } else if (likeRate >= 0.005) {
      engagementScore += 3;
    } else {
      engagementScore += 1;
    }

    /* Comment engagement — 6 points */

    if (commentRate >= 0.01) {
      engagementScore += 6;
    } else if (commentRate >= 0.005) {
      engagementScore += 5;
    } else if (commentRate >= 0.001) {
      engagementScore += 3;
    } else if (commentRate >= 0.0005) {
      engagementScore += 2;
    } else {
      engagementScore += 1;
    }
  }

   /* =======================================================
     5. GROWTH SIGNAL — 10 POINTS
  ======================================================= */

  let growthScore = 0;

  if (views > 0) {
    const viewsPerDay =
      views / Math.max(days, 1);

    if (viewsPerDay >= 100_000) {
      growthScore = 10;
    } else if (viewsPerDay >= 30_000) {
      growthScore = 8;
    } else if (viewsPerDay >= 10_000) {
      growthScore = 6;
    } else if (viewsPerDay >= 3_000) {
      growthScore = 4;
    } else if (viewsPerDay >= 1_000) {
      growthScore = 2;
    } else {
      growthScore = 1;
    }
  }


  /* =======================================================
     6. FINAL SCORE
  ======================================================= */

  const totalScore =
    viewScore +
    subscriberEfficiencyScore +
    recencyScore +
    engagementScore +
    growthScore;

  return Math.max(
    0,
    Math.min(
      Math.round(totalScore),
      100
    )
  );
}