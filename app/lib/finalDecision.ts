type DecisionInput = {
  opportunity: number;
  difficulty: number;
  confidence: number;
  benchmarkScore: number;
};

export type FinalDecisionValue =
  | "MAKE"
  | "WAIT"
  | "SKIP";

export interface FinalDecision {
  score: number;
  decision: FinalDecisionValue;
  reasons: string[];
  action: string;
}

export function calculateFinalDecision({
  opportunity,
  difficulty,
  confidence,
  benchmarkScore,
}: DecisionInput): FinalDecision {
  const score = Math.round(
    opportunity * 0.35 +
      (100 - difficulty) * 0.25 +
      confidence * 0.2 +
      benchmarkScore * 0.2
  );

  let decision: FinalDecisionValue;

  if (score >= 80) {
    decision = "MAKE";
  } else if (score >= 60) {
    decision = "WAIT";
  } else {
    decision = "SKIP";
  }

  const reasons: string[] = [];

  if (opportunity >= 80) {
    reasons.push("High opportunity");
  }

  if (difficulty <= 40) {
    reasons.push("Low competition");
  }

  if (confidence >= 85) {
    reasons.push("High confidence");
  }

  if (benchmarkScore >= 80) {
    reasons.push("Strong benchmark score");
  }

  const action =
    decision === "MAKE"
      ? "Upload within the next 48 hours."
      : decision === "WAIT"
      ? "Monitor this keyword for a few days."
      : "Choose another keyword.";

  return {
    score,
    decision,
    reasons,
    action,
  };
}