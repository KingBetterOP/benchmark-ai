type Verdict =
  | "STRONG BUY"
  | "GOOD"
  | "NEUTRAL"
  | "AVOID";

type VerdictInput = {
  total: number;
  trend: number;
  gap: number;
  competition: number;
};

export function calculateVerdictEngineV2({
  total,
  trend,
  gap,
  competition,
}: VerdictInput) {
  let verdict: Verdict = "NEUTRAL";

  if (
    total >= 85 &&
    trend >= 15 &&
    gap >= 12
  ) {
    verdict = "STRONG BUY";
  } else if (
    total >= 70 &&
    competition >= 10
  ) {
    verdict = "GOOD";
  } else if (total < 55) {
    verdict = "AVOID";
  }

  return {
    verdict,

    confidence: Math.min(
      99,
      Math.round(total + trend / 2)
    ),

    summary:
      verdict === "STRONG BUY"
        ? "Excellent opportunity."
        : verdict === "GOOD"
        ? "Good opportunity."
        : verdict === "NEUTRAL"
        ? "Wait for better timing."
        : "High risk keyword.",
  };
}