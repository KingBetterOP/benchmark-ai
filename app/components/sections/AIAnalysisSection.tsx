import type {
  KeywordIntelligence,
  ThumbnailAnalysis,
  TitleAnalysis,
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
  ContentPlanner,
  AIThumbnail,
  MissedOpportunity,
  FinalDecision,
  ViralPrediction,
} from "@/app/lib/types";

import DecisionCards from "../decision/DecisionCards";
import AnalysisCards from "../analysis/AnalysisCards";
import SEOCards from "../seo/SEOCards";
import PlanningCards from "../planning/PlanningCards";

type Props = {
  language: string;
  keyword: string;

  finalDecision: FinalDecision;
  keywordIntelligence: KeywordIntelligence;
  viralPrediction: ViralPrediction;

  missedOpportunities: MissedOpportunity[];

  thumbnailAnalysis: ThumbnailAnalysis;
  titleAnalysis: TitleAnalysis;

  seoAnalysis: SEOAnalysis | null;
  seoOptimizer: SEOOptimizer | null;
  contentGap: ContentGap[];
  channelAudit: ChannelAudit | null;

  contentPlanner: ContentPlanner[];
  aiThumbnail: AIThumbnail[];
};

export default function AIAnalysisSection({
  language,
  keyword,
  finalDecision,
  keywordIntelligence,
  viralPrediction,
  missedOpportunities,
  thumbnailAnalysis,
  titleAnalysis,
  seoAnalysis,
  seoOptimizer,
  contentGap,
  channelAudit,
  contentPlanner,
  aiThumbnail,
}: Props) {
  return (
    <>
      <DecisionCards
        language={language}
        keyword={keyword}
        finalDecision={finalDecision}
        keywordIntelligence={keywordIntelligence}
        viralPrediction={viralPrediction}
      />

      <AnalysisCards
      language={language}
        opportunities={missedOpportunities}
        thumbnailAnalysis={thumbnailAnalysis}
        titleAnalysis={titleAnalysis}
      />

      <SEOCards
      language={language}
        seoAnalysis={seoAnalysis}
        seoOptimizer={seoOptimizer}
        contentGap={contentGap}
        channelAudit={channelAudit}
      />

      <PlanningCards
      language={language}
        contentPlanner={contentPlanner}
        aiThumbnail={aiThumbnail}
      />
    </>
  );
}