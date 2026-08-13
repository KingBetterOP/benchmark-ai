import { Video } from "./types";

export type TrendEngineResult = {
  score: number;
  growthRate: number;
  recentUploads: number;
  averageAge: number;
};

export function calculateTrendEngineV2(
  videos: Video[]
): TrendEngineResult {
  if (!videos.length) {
    return {
      score: 0,
      growthRate: 0,
      recentUploads: 0,
      averageAge: 0,
    };
  }

  const now = Date.now();

  const ages = videos
    .map((video) => {
      const publishedAt =
        video.snippet?.publishedAt;

      if (!publishedAt) {
        return null;
      }

      const published =
        new Date(publishedAt).getTime();

      if (!Number.isFinite(published)) {
        return null;
      }

      const age =
        (now - published) /
        (1000 * 60 * 60 * 24);

      // 미래 날짜 데이터 방어
      if (age < 0) {
        return 0;
      }

      return age;
    })
    .filter(
      (age): age is number =>
        age !== null
    );

  if (!ages.length) {
    return {
      score: 0,
      growthRate: 0,
      recentUploads: 0,
      averageAge: 0,
    };
  }

  const averageAge =
    ages.reduce(
      (sum, age) => sum + age,
      0
    ) / ages.length;

  const recentUploads =
    ages.filter(
      (age) => age <= 30
    ).length;

  const veryRecentUploads =
    ages.filter(
      (age) => age <= 7
    ).length;

  /*
   * growthRate
   *
   * 실제 조회수 성장률이 아니라
   * 검색 결과 중 최근 30일 이내에
   * 업로드된 영상의 비율이다.
   *
   * 현재 Video 데이터 구조에서는
   * 영상별 과거 조회수 데이터가 없기 때문에
   * 이것을 "업로드 모멘텀"으로 사용한다.
   */
  const growthRate =
    Math.round(
      (recentUploads / ages.length) * 100
    );

  /*
   * -----------------------------------------
   * 1. 최근 업로드 모멘텀
   * 최대 8점
   * -----------------------------------------
   */

  let momentumScore = 0;

  if (growthRate >= 80) {
    momentumScore = 8;
  } else if (growthRate >= 60) {
    momentumScore = 7;
  } else if (growthRate >= 40) {
    momentumScore = 5;
  } else if (growthRate >= 20) {
    momentumScore = 3;
  } else {
    momentumScore = 1;
  }

  /*
   * -----------------------------------------
   * 2. 최근 7일 급상승 신호
   * 최대 3점
   * -----------------------------------------
   */

  let recentScore = 0;

  const veryRecentRatio =
    veryRecentUploads / ages.length;

  if (veryRecentRatio >= 0.5) {
    recentScore = 3;
  } else if (veryRecentRatio >= 0.3) {
    recentScore = 2;
  } else if (veryRecentRatio > 0) {
    recentScore = 1;
  }

  /*
   * -----------------------------------------
   * 3. 평균 영상 연령
   * 최대 4점
   * -----------------------------------------
   */

  let ageScore = 0;

  if (averageAge <= 14) {
    ageScore = 4;
  } else if (averageAge <= 30) {
    ageScore = 3;
  } else if (averageAge <= 60) {
    ageScore = 2;
  } else if (averageAge <= 120) {
    ageScore = 1;
  } else {
    ageScore = 0;
  }

  /*
   * -----------------------------------------
   * 4. 데이터 신뢰도
   *
   * 영상 수가 너무 적으면
   * 트렌드 점수가 과도하게 높아지는 것을 방지한다.
   *
   * 1개 → 50%
   * 2개 → 65%
   * 3개 → 80%
   * 4개 이상 → 100%
   * -----------------------------------------
   */

  let confidenceMultiplier = 1;

  if (ages.length === 1) {
    confidenceMultiplier = 0.5;
  } else if (ages.length === 2) {
    confidenceMultiplier = 0.65;
  } else if (ages.length === 3) {
    confidenceMultiplier = 0.8;
  }

  const rawScore =
    momentumScore +
    recentScore +
    ageScore;

  const score = Math.min(
    15,
    Math.round(
      rawScore * confidenceMultiplier
    )
  );

  return {
    score,
    growthRate,
    recentUploads,
    averageAge: Math.round(
      averageAge
    ),
  };
}