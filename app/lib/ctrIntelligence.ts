export interface CTRIntelligenceData {
  overallScore: number;

  thumbnailScore: number;

  titleScore: number;

  curiosityScore: number;

  emotionalScore: number;

  expectedCTR: number;

  expectedViewIncrease: number;

  recommendation:
    | "excellent"
    | "good"
    | "improve";
}

export function calculateCTRIntelligence(
  thumbnailScore: number,
  titleScore: number
): CTRIntelligenceData {

  const curiosityScore = Math.min(
    100,
    Math.round(titleScore * 0.95)
  );

  const emotionalScore = Math.min(
    100,
    Math.round(thumbnailScore * 0.9)
  );

  const overallScore = Math.round(
    (
      thumbnailScore +
      titleScore +
      curiosityScore +
      emotionalScore
    ) / 4
  );

  const expectedCTR = Number(
    (
      overallScore * 0.09
    ).toFixed(1)
  );

  const expectedViewIncrease = Math.round(
    overallScore * 1.25
  );

  const recommendation =
    overallScore >= 80
      ? "excellent"
      : overallScore >= 60
      ? "good"
      : "improve";

  return {
    overallScore,
    thumbnailScore,
    titleScore,
    curiosityScore,
    emotionalScore,
    expectedCTR,
    expectedViewIncrease,
    recommendation,
  };
}