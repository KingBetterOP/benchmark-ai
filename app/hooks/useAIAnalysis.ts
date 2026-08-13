import { useState } from "react";

import type {
  KeywordIntelligence,
  MissedOpportunity,
  ThumbnailAnalysis,
} from "../lib/types";

export function useAIAnalysis() {
  const [keywordIntelligence, setKeywordIntelligence] =
    useState<KeywordIntelligence>({
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
    useState<MissedOpportunity[]>([]);

  const [thumbnailAnalysis, setThumbnailAnalysis] =
    useState<ThumbnailAnalysis>({
      ctrScore: 0,
      emotionScore: 0,
      colorScore: 0,
      textScore: 0,
      overallScore: 0,
      strengths: [],
      improvements: [],
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