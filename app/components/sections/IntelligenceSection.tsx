"use client";

import KeywordIntelligenceSection from "../keyword/KeywordIntelligenceSection";
import CompetitorIntelligenceSection from "../competitor/CompetitorIntelligenceSection";
import SEOIntelligenceSection from "../seo/SEOIntelligenceSection";
import CTRIntelligenceSection from "../ctr/CTRIntelligenceSection";
import RevenueIntelligenceSection from "../revenue/RevenueIntelligenceSection";

import { SEOOptimizer } from "../../lib/types";

type Props = {
  averageViews: number;

  keywordDifficulty: number;
  keywordOpportunity: number;
  estimatedRPM: string;

  benchmarkScore: number;

  seoOptimizer: SEOOptimizer | null;

  thumbnailScore: number;
  titleScore: number;

  language: string;
};

export default function IntelligenceSection({
  averageViews,
  keywordDifficulty,
  keywordOpportunity,
  estimatedRPM,
  benchmarkScore,
  seoOptimizer,
  thumbnailScore,
  titleScore,
  language,
}: Props) {
  return (
    <>
      <KeywordIntelligenceSection
        averageViews={averageViews}
        competition={keywordDifficulty}
        language={language}
      />

      <CompetitorIntelligenceSection
        competition={keywordDifficulty}
        opportunity={keywordOpportunity}
        language={language}
      />

      <SEOIntelligenceSection
        benchmarkScore={benchmarkScore}
        opportunity={keywordOpportunity}
        optimizer={seoOptimizer}
        language={language}
      />

      <CTRIntelligenceSection
        thumbnailScore={thumbnailScore}
        titleScore={titleScore}
        language={language}
      />

      <RevenueIntelligenceSection
        monthlyViews={averageViews * 30}
        rpm={Number(estimatedRPM) || 5}
        language={language}
      />
    </>
  );
}