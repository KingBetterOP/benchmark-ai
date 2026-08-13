import type { VideoPerformanceData } from "./performanceTypes";

export type PerformanceScore = {
  total: number;
  engagement: number;
  velocity: number;
  contentStrength: number;
  verdict: "EXCEPTIONAL" | "STRONG" | "AVERAGE" | "WEAK";
  explanation: string;
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function safeNumber(value: unknown) {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getAgeDays(publishedAt: string) {
  const published = new Date(publishedAt).getTime();

  if (!Number.isFinite(published)) {
    return 30;
  }

  const age =
    (Date.now() - published) /
    (1000 * 60 * 60 * 24);

  return Math.max(1, age);
}

function getDurationSeconds(duration: string) {
  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return 0;

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  return (
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}

export function calculatePerformanceScore(
  video: VideoPerformanceData
): PerformanceScore {
  const views = safeNumber(video.views);
  const likes = safeNumber(video.likes);
  const comments = safeNumber(video.comments);

  const ageDays = getAgeDays(video.publishedAt);

  const durationSeconds =
    getDurationSeconds(video.duration);

  /*
   * Engagement
   *
   * 공개 영상에서 실제 CTR이나 Retention은
   * 알 수 없으므로 좋아요/댓글 반응을 사용한다.
   */

  const likeRate =
    views > 0 ? (likes / views) * 100 : 0;

  const commentRate =
    views > 0 ? (comments / views) * 100 : 0;

  const likeScore = clamp(
    (likeRate / 8) * 100
  );

  const commentScore = clamp(
    (commentRate / 0.5) * 100
  );

  const engagement = Math.round(
    likeScore * 0.7 +
    commentScore * 0.3
  );

  /*
   * Velocity
   *
   * 하루 평균 조회수.
   */

  const dailyViews =
    views / Math.max(ageDays, 1);

  /*
   * 로그 스케일을 사용해서
   * 초대형 채널의 숫자가 모든 것을 압도하지 않도록 한다.
   */

  const velocity =
    Math.round(
      clamp(
        (Math.log10(
          dailyViews + 1
        ) /
          5) *
          100
      )
    );

  /*
   * Content Strength
   *
   * 영상 길이와 engagement를
   * 함께 고려한다.
   */

  let durationScore = 70;

  if (durationSeconds > 0) {
    if (
      durationSeconds >= 180 &&
      durationSeconds <= 900
    ) {
      durationScore = 90;
    } else if (
      durationSeconds >= 60 &&
      durationSeconds <= 1800
    ) {
      durationScore = 80;
    } else if (
      durationSeconds < 30
    ) {
      durationScore = 55;
    }
  }

  const contentStrength = Math.round(
    engagement * 0.6 +
    durationScore * 0.4
  );

  /*
   * Final Score
   */

  const total = Math.round(
    engagement * 0.4 +
    velocity * 0.4 +
    contentStrength * 0.2
  );

  let verdict:
    | "EXCEPTIONAL"
    | "STRONG"
    | "AVERAGE"
    | "WEAK";

  if (total >= 85) {
    verdict = "EXCEPTIONAL";
  } else if (total >= 70) {
    verdict = "STRONG";
  } else if (total >= 50) {
    verdict = "AVERAGE";
  } else {
    verdict = "WEAK";
  }

  let explanation = "";

  if (verdict === "EXCEPTIONAL") {
    explanation =
      "이 영상은 공개적으로 확인 가능한 성과 지표에서 매우 강한 성과를 보이고 있습니다.";
  } else if (verdict === "STRONG") {
    explanation =
      "이 영상은 조회 속도와 시청자 반응을 종합했을 때 경쟁력 있는 성과를 보이고 있습니다.";
  } else if (verdict === "AVERAGE") {
    explanation =
      "평균적인 성과 수준입니다. 참여율이나 조회 속도를 개선할 여지가 있습니다.";
  } else {
    explanation =
      "현재 공개 지표 기준으로 성과가 상대적으로 약합니다.";
  }

  return {
    total,
    engagement,
    velocity,
    contentStrength,
    verdict,
    explanation,
  };
}