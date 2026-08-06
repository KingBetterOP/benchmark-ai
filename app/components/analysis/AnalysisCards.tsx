import type {
  MissedOpportunity,
  ThumbnailAnalysis,
  TitleAnalysis,
} from "@/app/lib/types";
type Props = {
  opportunities: MissedOpportunity[];
  thumbnailAnalysis: ThumbnailAnalysis;
  titleAnalysis: TitleAnalysis;
};

import MissedOpportunitiesCard from "../MissedOpportunitiesCard";
import ThumbnailAnalyzerCard from "../ThumbnailAnalyzerCard";
import TitleAnalyzerCard from "../TitleAnalyzerCard";





export default function AnalysisCards({
  opportunities,
  thumbnailAnalysis,
  titleAnalysis,
}: Props) {
  return (
    <>
      <MissedOpportunitiesCard
        opportunities={opportunities}
      />

      <ThumbnailAnalyzerCard
        ctrScore={thumbnailAnalysis.ctrScore}
        emotionScore={thumbnailAnalysis.emotionScore}
        colorScore={thumbnailAnalysis.colorScore}
        textScore={thumbnailAnalysis.textScore}
        overallScore={thumbnailAnalysis.overallScore}
        strengths={thumbnailAnalysis.strengths}
        improvements={thumbnailAnalysis.improvements}
      />

      <TitleAnalyzerCard
        ctrScore={titleAnalysis.ctrScore}
        seoScore={titleAnalysis.seoScore}
        emotionScore={titleAnalysis.emotionScore}
        curiosityScore={titleAnalysis.curiosityScore}
        lengthScore={titleAnalysis.lengthScore}
        overallScore={titleAnalysis.overallScore}
        improvements={titleAnalysis.improvements}
        betterTitles={titleAnalysis.betterTitles}
      />
    </>
  );
}