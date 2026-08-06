export interface RevenueIntelligenceData {
  expectedRPM: number;

  expectedCPM: number;

  estimatedRevenue: number;

  estimatedMonthlyRevenue: number;

  estimatedYearlyRevenue: number;

  profitabilityScore: number;

  recommendation:
    | "excellent"
    | "good"
    | "improve";
}

export function calculateRevenueIntelligence(
  monthlyViews: number,
  rpm: number
): RevenueIntelligenceData {

  const expectedRPM = rpm;

  const expectedCPM = Number(
    (rpm * 2.2).toFixed(2)
  );

  const estimatedRevenue =
    (monthlyViews / 1000) * expectedRPM;

  const estimatedMonthlyRevenue =
    Math.round(estimatedRevenue);

  const estimatedYearlyRevenue =
    estimatedMonthlyRevenue * 12;

  const profitabilityScore = Math.min(
    100,
    Math.round(
      (expectedRPM * 12 +
        monthlyViews / 10000) /
        2
    )
  );

  const recommendation =
    profitabilityScore >= 80
      ? "excellent"
      : profitabilityScore >= 60
      ? "good"
      : "improve";

  return {
    expectedRPM,
    expectedCPM,
    estimatedRevenue,
    estimatedMonthlyRevenue,
    estimatedYearlyRevenue,
    profitabilityScore,
    recommendation,
  };
}