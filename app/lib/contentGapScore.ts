import { ContentGap } from "./competitorGap";

export function calculateContentGapScore(
  gaps: ContentGap[]
) {
  if (gaps.length === 0) {
    return {
      score: 0,
      verdict: "No Opportunity",
    };
  }

  const average =
    gaps.reduce(
      (sum, gap) => sum + gap.opportunity,
      0
    ) / gaps.length;

  const score = Math.round(average);

  let verdict = "Low";

  if (score >= 90) verdict = "Excellent";
  else if (score >= 75) verdict = "High";
  else if (score >= 60) verdict = "Medium";

  return {
    score,
    verdict,
  };
}