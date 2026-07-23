import { searchYoutube } from "./search";
import { processVideos } from "./processVideos";
import { generateAllAI } from "./ai";

import {
  createBenchmarkPrompt,
  createIdeaPrompt,
  createStrategyPrompt,
  createCompetitionPrompt,
  createTitlePrompt,
  createRecommendedChannelsPrompt,
  createOpportunityPrompt,
} from "./prompts";

type Params = {
  keyword: string;
  order: string;

  excludeShorts: boolean;
  min10Minutes: boolean;
  last30Days: boolean;

  onStep?: (text: string) => void;
  onProgress?: (progress: number) => void;
};

export async function benchmarkService({
  keyword,
  order,

  excludeShorts,
  min10Minutes,
  last30Days,

  onStep,
  onProgress,
}: Params) {
  onStep?.("🔍 YouTube 데이터를 가져오는 중...");
  onProgress?.(10);

  const data = await searchYoutube({
    keyword,
    order,
    last30Days,
  });

  if (!data.items) {
    throw new Error("YouTube API 응답 오류");
  }

  onStep?.("📊 검색 결과 분석 중...");
  onProgress?.(30);

  const processed = processVideos(
    data.items,
    excludeShorts,
    min10Minutes
  );

  const prompt =
    createBenchmarkPrompt(
      keyword,
      processed.topVideos
    );

  const ideaPrompt =
    createIdeaPrompt(keyword);

  const strategyPrompt =
    createStrategyPrompt(keyword);

  const competitionPrompt =
    createCompetitionPrompt(keyword);

  const titlePrompt =
    createTitlePrompt(keyword);

  const recommendedChannelsPrompt =
    createRecommendedChannelsPrompt(
      keyword,
      processed.channels
    );

  const opportunityPrompt =
    createOpportunityPrompt();

  onStep?.("🤖 AI 분석 중...");
  onProgress?.(60);

  const ai =
    await generateAllAI({

      reportPrompt: prompt,

      ideaPrompt,

      strategyPrompt,

      competitionPrompt,

      titlePrompt,

      thumbnailPrompt: keyword,

      recommendedChannelsPrompt,

      opportunityPrompt,

    });

  onStep?.("✅ 결과 정리 중...");
  onProgress?.(100);

  return {

    processed,

    ai,

  };
}