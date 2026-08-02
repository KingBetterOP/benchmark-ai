import { useState } from "react";

export function useAIAnalysis() {

  const [keywordIntelligence, setKeywordIntelligence] =
    useState({
      difficulty: 0,
      opportunity: 0,
      trend: "",
      demand: "",
      uploadTime: "",
      audience: "",
      expectedViews: "",
      expectedCTR: "",
      estimatedRPM: "",
      estimatedRevenue: "",
      recommendation: "",
      confidence: 0,
    });

  const [missedOpportunities, setMissedOpportunities] =
    useState<
      {
        title: string;
        reason: string;
      }[]
    >([]);

  const [thumbnailAnalysis, setThumbnailAnalysis] =
    useState({
      ctrScore: 0,
      emotionScore: 0,
      colorScore: 0,
      textScore: 0,
      overallScore: 0,
      strengths: [] as string[],
      improvements: [] as string[],
    });

  return {
    keywordIntelligence,
    setKeywordIntelligence,

    missedOpportunities,
    setMissedOpportunities,

    thumbnailAnalysis,
    setThumbnailAnalysis,
  };
}