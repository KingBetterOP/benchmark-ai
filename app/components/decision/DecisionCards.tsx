import FinalDecisionCard from "../FinalDecisionCard";
import AIKeywordIntelligenceCard from "../AIKeywordIntelligenceCard";
import ViralPredictorCard from "../ViralPredictorCard";
import type {
  FinalDecision,
  KeywordIntelligence,
  ViralPrediction,
} from "@/app/lib/types";

type Props = {
  language: string;

  finalDecision: FinalDecision;

  keyword: string;

  keywordIntelligence: KeywordIntelligence;

  viralPrediction: ViralPrediction;
};

  

export default function DecisionCards({
  language,
  finalDecision,
  keyword,
  keywordIntelligence,
  viralPrediction,
}: Props) {
  return (
    <>
      <FinalDecisionCard
  score={finalDecision.score}
  decision={
  finalDecision.decision ===
  "MAKE THIS VIDEO"
    ? "MAKE"
    : finalDecision.decision ===
      "WAIT"
      ? "WAIT"
      : "SKIP"
}
  reasons={finalDecision.reasons}
  action={finalDecision.action}
  language={language}
/>

      <AIKeywordIntelligenceCard
        keyword={keyword}
        difficulty={keywordIntelligence.difficulty}
        opportunity={keywordIntelligence.opportunity}
        trend={keywordIntelligence.trend}
        demand={keywordIntelligence.demand}
        uploadTime={keywordIntelligence.uploadTime}
        audience={keywordIntelligence.audience}
        expectedViews={keywordIntelligence.expectedViews}
        expectedCTR={keywordIntelligence.expectedCTR}
        estimatedRPM={keywordIntelligence.estimatedRPM}
        estimatedRevenue={
          keywordIntelligence.estimatedRevenue
        }
        recommendation={
          keywordIntelligence.recommendation
        }
        confidence={keywordIntelligence.confidence}
      />

      <ViralPredictorCard
        successProbability={
          viralPrediction.successProbability
        }
        expectedViews={
          viralPrediction.expectedViews
        }
        expectedCTR={
          viralPrediction.expectedCTR
        }
        estimatedRPM={
          viralPrediction.estimatedRPM
        }
        estimatedRevenue={
          viralPrediction.estimatedRevenue
        }
        competition={
          viralPrediction.competition
        }
        recommendation={
          viralPrediction.recommendation
        }
        confidence={
          viralPrediction.confidence
        }
      />
          </>
  );
}