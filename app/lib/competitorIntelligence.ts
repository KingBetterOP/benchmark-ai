export interface CompetitorIntelligenceData {
  strengthScore: number;
  weaknessScore: number;
  opportunityScore: number;
  threatScore: number;

  winProbability: number;

  recommendation:
    | "attack"
    | "compete"
    | "avoid";
}

export function calculateCompetitorIntelligence(
  competition: number,
  opportunity: number
): CompetitorIntelligenceData {
  const strengthScore = Math.max(
    0,
    100 - competition
  );

  const weaknessScore = Math.min(
    100,
    competition * 0.8
  );

  const opportunityScore = Math.min(
    100,
    opportunity
  );

  const threatScore = Math.min(
    100,
    competition
  );

  const winProbability = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        strengthScore * 0.5 +
        opportunityScore * 0.5
      )
    )
  );

  const recommendation =
    winProbability >= 80
      ? "attack"
      : winProbability >= 60
      ? "compete"
      : "avoid";

  return {
    strengthScore,
    weaknessScore,
    opportunityScore,
    threatScore,
    winProbability,
    recommendation,
  };
}