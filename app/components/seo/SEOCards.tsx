import type {
  SEOAnalysis,
  SEOOptimizer,
  ContentGap,
  ChannelAudit,
} from "@/app/lib/types";

import SEOAnalysisCard from "../SEOAnalysisCard";
import ContentGapCard from "../ContentGapCard";
import ChannelAuditCard from "../ChannelAuditCard";
import SEOOptimizerCard from "../SEOOptimizerCard";

type Props = {
  seoAnalysis: SEOAnalysis | null;
  seoOptimizer: SEOOptimizer | null;
  contentGap: ContentGap[];
  channelAudit: ChannelAudit | null;
};

export default function SEOCards({
  seoAnalysis,
  seoOptimizer,
  contentGap,
  channelAudit,
}: Props) {
  return (
    <>
      <SEOAnalysisCard
        seo={seoAnalysis}
      />

      <ContentGapCard
        gaps={contentGap}
      />

      <ChannelAuditCard
        audit={channelAudit}
      />

      <SEOOptimizerCard
        optimizer={seoOptimizer}
      />
    </>
  );
}