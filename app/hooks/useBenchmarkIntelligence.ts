import { useMemo } from "react";

import { calculateOpportunityScoreV2 } from "../lib/opportunityScoreV2";
import { calculateTrendingScore } from "../lib/trendingScore";
import { calculateFinalDecision } from "../lib/finalDecision";

import type {
  Video,
  BenchmarkReport,
} from "../lib/types";

type KeywordIntelligence = {
  opportunity: number;
  difficulty: number;
  confidence: number;
};

type UseBenchmarkIntelligenceOptions = {
  results: Video[];
  keywordIntelligence: KeywordIntelligence;
  report: BenchmarkReport | null;
};

export function useBenchmarkIntelligence({
  results,
  keywordIntelligence,
  report,
}: UseBenchmarkIntelligenceOptions) {
  /* ==========================================================
     OPPORTUNITY SCORE
     ========================================================== */

  const opportunityScoreV2 = useMemo(
    () => calculateOpportunityScoreV2(results),
    [results]
  );

  /* ==========================================================
     TRENDING SCORE
     ========================================================== */

  const trendingScore = useMemo(
    () => calculateTrendingScore(results),
    [results]
  );

  /* ==========================================================
     FINAL DECISION
     ========================================================== */

  const finalDecision = useMemo(
    () =>
      calculateFinalDecision({
        opportunity:
          keywordIntelligence.opportunity,

        difficulty:
          keywordIntelligence.difficulty,

        confidence:
          keywordIntelligence.confidence,

        benchmarkScore:
          report?.score ?? 0,
      }),
    [
      keywordIntelligence.opportunity,
      keywordIntelligence.difficulty,
      keywordIntelligence.confidence,
      report?.score,
    ]
  );

  return {
    opportunityScoreV2,
    trendingScore,
    finalDecision,
  };
}