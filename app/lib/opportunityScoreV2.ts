import { Video } from "./types";
import { calculateTrendEngineV2 } from "./trendEngineV2";
import { calculateFreshnessEngineV2 } from "./freshnessEngineV2";
import { calculateCTREngineV2 } from "./ctrEngineV2";
import { calculateTitleEngineV2 } from "./titleEngineV2";
import { calculateThumbnailEngineV2 } from "./thumbnailEngineV2";
import { calculateGapEngineV2 } from "./gapEngineV2";
import { calculateVerdictEngineV2 } from "./verdictEngineV2";

type OpportunityScoreV2 = {
  total: number;

  demand: number;

  competition: number;

  trend: number;

  ctr: number;

  thumbnail: number;

  title: number;

  freshness: number;

  gap: number;

  confidence: number;

  verdict: "MAKE" | "WAIT" | "AVOID";

  trendEngine: ReturnType<typeof calculateTrendEngineV2>;

  freshnessEngine: ReturnType<
    typeof calculateFreshnessEngineV2
  >;

  ctrEngine: ReturnType<
    typeof calculateCTREngineV2
  >;

  thumbnailEngine: ReturnType<
    typeof calculateThumbnailEngineV2
  >;

  titleEngine: ReturnType<
    typeof calculateTitleEngineV2
  >;

  gapEngine: ReturnType<
    typeof calculateGapEngineV2
  >;

  verdictEngine: ReturnType<
    typeof calculateVerdictEngineV2
  >;
};

/**
 * Clamp a number between min and max.
 */
function clamp(
  value: number,
  min: number,
  max: number
): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(
    max,
    Math.max(min, value)
  );
}

/**
 * Normalize a 0~20 score into a 0~5 score.
 *
 * GapEngineV2 currently returns a 0~20 opportunity score,
 * while the final Opportunity Score V2 gives Gap a maximum
 * weight of 5 points.
 */
function normalizeGapScore(
  score: number
): number {
  return Math.round(
    clamp(score, 0, 20) / 4
  );
}

/**
 * Benchmark AI Opportunity Score V2
 *
 * Final score = 100 points
 *
 * Demand       20
 * Competition  20
 * Trend        15
 * CTR          10
 * Thumbnail    10
 * Title        10
 * Freshness    10
 * Gap           5
 *
 * Total        100
 */
export function calculateOpportunityScoreV2(
  videos: Video[]
): OpportunityScoreV2 {
  /**
   * --------------------------------------------------
   * EMPTY DATA
   * --------------------------------------------------
   */
  if (!videos.length) {
    return {
      total: 0,

      demand: 0,

      competition: 0,

      trend: 0,

      ctr: 0,

      thumbnail: 0,

      title: 0,

      freshness: 0,

      gap: 0,

      confidence: 0,

      verdict: "WAIT",

      trendEngine: {
        score: 0,
        growthRate: 0,
        recentUploads: 0,
        averageAge: 0,
      },

      freshnessEngine: {
        score: 0,
        last7Days: 0,
        last30Days: 0,
        last90Days: 0,
      },

      ctrEngine: {
        score: 0,
        averageViews: 0,
        highPerformers: 0,
      },

      thumbnailEngine: {
        score: 0,
        face: 0,
        contrast: 0,
        text: 0,
        click: 0,
      },

      titleEngine: {
        score: 0,
        seo: 0,
        emotion: 0,
        ctr: 0,
        keyword: 0,
        length: 0,
      },

      gapEngine: {
        score: 0,
        lowCompetitionVideos: 0,
        averageViews: 0,
        opportunity: "LOW",
      },

      verdictEngine: {
        verdict: "NEUTRAL",
        confidence: 0,
        summary: "",
      },
    };
  }

  /**
   * --------------------------------------------------
   * BASIC DATA
   * --------------------------------------------------
   */

  const validVideos = videos.filter(
    (video) =>
      video &&
      video.statistics &&
      video.snippet
  );

  const videoCount = validVideos.length;

  const avgViews =
    videoCount > 0
      ? validVideos.reduce(
          (sum, video) =>
            sum +
            Number(
              video.statistics?.viewCount ?? 0
            ),
          0
        ) / videoCount
      : 0;

  /**
   * --------------------------------------------------
   * 1. DEMAND — MAX 20
   * --------------------------------------------------
   *
   * Higher average views = higher demand.
   *
   * This is intentionally conservative.
   * The raw YouTube search result average is not treated
   * as a perfect measurement of total market demand.
   */

  const demand = clamp(
    Math.round(avgViews / 250000),
    0,
    20
  );

  /**
   * --------------------------------------------------
   * 2. COMPETITION — MAX 20
   * --------------------------------------------------
   *
   * IMPORTANT:
   *
   * Lower competition = higher score.
   *
   * The search result count itself is not a perfect
   * competition measurement, but we keep the current
   * architecture compatible with the existing system.
   *
   * More returned videos → more competition.
   */

  const competition = clamp(
    20 - Math.min(20, videos.length),
    0,
    20
  );

  /**
   * --------------------------------------------------
   * 3. TREND — MAX 15
   * --------------------------------------------------
   */

  const trendEngine =
    calculateTrendEngineV2(validVideos);

  const trend = clamp(
    trendEngine.score,
    0,
    15
  );

  /**
   * --------------------------------------------------
   * 4. CTR — MAX 10
   * --------------------------------------------------
   */

  const ctrEngine =
    calculateCTREngineV2(validVideos);

  const ctr = clamp(
    ctrEngine.score,
    0,
    10
  );

  /**
   * --------------------------------------------------
   * 5. THUMBNAIL — MAX 10
   * --------------------------------------------------
   */

  const thumbnailEngine =
    calculateThumbnailEngineV2(
      validVideos
    );

  const thumbnail = clamp(
    thumbnailEngine.score,
    0,
    10
  );

  /**
   * --------------------------------------------------
   * 6. TITLE — MAX 10
   * --------------------------------------------------
   */

  const titleEngine =
    calculateTitleEngineV2(
      validVideos
    );

  const title = clamp(
    titleEngine.score,
    0,
    10
  );

  /**
   * --------------------------------------------------
   * 7. FRESHNESS — MAX 10
   * --------------------------------------------------
   */

  const freshnessEngine =
    calculateFreshnessEngineV2(
      validVideos
    );

  const freshness = clamp(
    freshnessEngine.score,
    0,
    10
  );

  /**
   * --------------------------------------------------
   * 8. GAP — MAX 5
   * --------------------------------------------------
   *
   * GapEngineV2 currently operates on a 0~20 scale.
   *
   * Final Opportunity Score V2 gives Gap a maximum
   * contribution of 5 points.
   *
   * Therefore:
   *
   * 0~20 → 0~5
   */

  const gapEngine =
    calculateGapEngineV2(
      validVideos
    );

  const gap = normalizeGapScore(
    gapEngine.score
  );

  /**
   * --------------------------------------------------
   * FINAL SCORE — EXACTLY 100 POINTS
   * --------------------------------------------------
   */

  const total = clamp(
    demand +
      competition +
      trend +
      ctr +
      thumbnail +
      title +
      freshness +
      gap,
    0,
    100
  );

  /**
   * --------------------------------------------------
   * CONFIDENCE
   * --------------------------------------------------
   *
   * Confidence is NOT simply total + 5.
   *
   * A high opportunity score with very little data
   * should not automatically produce high confidence.
   *
   * Base confidence:
   * - 1~4 videos  → low
   * - 5~9 videos  → moderate
   * - 10+ videos  → stronger
   *
   * The score itself contributes a smaller amount.
   */

  let dataConfidence = 0;

  if (videoCount >= 20) {
    dataConfidence = 20;
  } else if (videoCount >= 15) {
    dataConfidence = 17;
  } else if (videoCount >= 10) {
    dataConfidence = 15;
  } else if (videoCount >= 7) {
    dataConfidence = 11;
  } else if (videoCount >= 5) {
    dataConfidence = 8;
  } else {
    dataConfidence = 4;
  }

  const scoreConfidence =
    Math.round(total * 0.65);

  const confidence = clamp(
    scoreConfidence +
      dataConfidence,
    0,
    99
  );

  /**
   * --------------------------------------------------
   * VERDICT ENGINE
   * --------------------------------------------------
   */

  const verdictEngine =
    calculateVerdictEngineV2({
      total,
      trend,
      gap,
      competition,
    });

  /**
   * --------------------------------------------------
   * FINAL VERDICT
   * --------------------------------------------------
   *
   * 80~100 → MAKE
   * 60~79  → WAIT
   * 0~59   → AVOID
   *
   * This keeps the public Opportunity Score
   * independent from the internal wording of
   * VerdictEngineV2.
   */

  const verdict =
    total >= 80
      ? "MAKE"
      : total >= 60
      ? "WAIT"
      : "AVOID";

  /**
   * --------------------------------------------------
   * RETURN
   * --------------------------------------------------
   */

  return {
    total,

    demand,

    competition,

    trend,

    ctr,

    thumbnail,

    title,

    freshness,

    gap,

    confidence,

    verdict,

    trendEngine,

    freshnessEngine,

    ctrEngine,

    thumbnailEngine,

    titleEngine,

    gapEngine,

    verdictEngine,
  };
}