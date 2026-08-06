export interface KeywordIntelligenceData {
  score: number;

  demand: number;

  competition: number;

  opportunity: number;

  trend: number;

  seasonality: number;

  expectedCTR: number;

  expectedRPM: number;

  estimatedRevenue: number;

  verdict:
    | "publish"
    | "test"
    | "avoid";
}

export function calculateKeywordIntelligence(
  views: number,
  competition: number
): KeywordIntelligenceData {
  const demand = Math.min(
    100,
    Math.round(views / 10000)
  );

  const opportunity = Math.max(
    0,
    Math.min(
      100,
      demand - competition + 40
    )
  );

  const trend = Math.min(
    100,
    Math.round(demand * 0.9 + 8)
  );

  const seasonality = Math.max(
    40,
    Math.round(trend * 0.8)
  );

  const expectedCTR = Number(
    (
      4 +
      opportunity * 0.05
    ).toFixed(1)
  );

  const expectedRPM = Number(
    (
      2 +
      demand * 0.08
    ).toFixed(2)
  );

  const estimatedRevenue = Math.round(
    (views / 1000) * expectedRPM
  );

  const score = Math.round(
    (
      demand * 0.3 +
      opportunity * 0.3 +
      trend * 0.2 +
      seasonality * 0.2
    )
  );

  const verdict =
    score >= 80
      ? "publish"
      : score >= 60
      ? "test"
      : "avoid";

  return {
    score,

    demand,

    competition,

    opportunity,

    trend,

    seasonality,

    expectedCTR,

    expectedRPM,

    estimatedRevenue,

    verdict,
  };
}