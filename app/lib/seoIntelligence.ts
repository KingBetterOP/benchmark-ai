export interface SEOIntelligenceData {
  overallScore: number;

  titleScore: number;

  descriptionScore: number;

  keywordScore: number;

  tagScore: number;

  rankingProbability: number;

  recommendation:
    | "excellent"
    | "good"
    | "improve";
}

export function calculateSEOIntelligence(
  benchmarkScore: number,
  opportunity: number
): SEOIntelligenceData {
  const titleScore = Math.min(
    100,
    Math.round(benchmarkScore * 0.95)
  );

  const descriptionScore = Math.min(
    100,
    Math.round(opportunity * 0.9)
  );

  const keywordScore = Math.min(
    100,
    Math.round(
      (titleScore + descriptionScore) / 2
    )
  );

  const tagScore = Math.min(
    100,
    Math.round(keywordScore * 0.9)
  );

  const overallScore = Math.round(
    (
      titleScore +
      descriptionScore +
      keywordScore +
      tagScore
    ) / 4
  );

  const rankingProbability = Math.min(
    100,
    Math.round(
      overallScore * 0.95
    )
  );

  const recommendation =
    overallScore >= 80
      ? "excellent"
      : overallScore >= 60
      ? "good"
      : "improve";

  return {
    overallScore,
    titleScore,
    descriptionScore,
    keywordScore,
    tagScore,
    rankingProbability,
    recommendation,
  };
}