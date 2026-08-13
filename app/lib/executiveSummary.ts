type SummaryInput = {
  opportunity: number;
  trending: number;
  gapScore: number;
};

export function generateExecutiveSummary({
  opportunity,
  trending,
  gapScore,
}: SummaryInput) {
  const overall = Math.round(
    (opportunity + trending + gapScore) / 3
  );

  if (overall >= 85) {
    return {
      overall,
      verdict: "MAKE THIS VIDEO",
      color: "green",
      summary:
        "This keyword shows excellent potential across competition, trend, and opportunity.",
    };
  }

  if (overall >= 70) {
    return {
      overall,
      verdict: "GOOD OPPORTUNITY",
      color: "yellow",
      summary:
        "The keyword has solid potential but could benefit from stronger differentiation.",
    };
  }

  return {
    overall,
    verdict: "LOOK FOR BETTER KEYWORDS",
    color: "red",
    summary:
      "Current benchmark suggests focusing on another keyword.",
    };
}