"use client";

import { useState } from "react";
import {
  Video,
  Channel,
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
  ThumbnailPlan,
  Opportunity,
} from "../lib/types";

export function useBenchmarkState() {
  const [keyword, setKeyword] = useState("");

  const [results, setResults] = useState<Video[]>([]);
  const [averageViews, setAverageViews] = useState(0);

  const [report, setReport] =
    useState<BenchmarkReport | null>(null);

  const [idea, setIdea] =
    useState<ContentIdea[]>([]);

  return {
    keyword,
    setKeyword,

    results,
    setResults,

    averageViews,
    setAverageViews,

    report,
    setReport,

    idea,
    setIdea,
  };
}