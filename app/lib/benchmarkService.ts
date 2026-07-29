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
  createThumbnailPrompt,
} from "./prompts";

type Params = {
  keyword: string;
  order: string;
language: string;
  excludeShorts: boolean;
  min10Minutes: boolean;
  last30Days: boolean;

  onStep?: (text: string) => void;
  onProgress?: (progress: number) => void;
};

export async function benchmarkService({
  keyword,
  order,
language,
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

  onStep?.("📊 영상 데이터를 분석하는 중...");
onProgress?.(25);

  const processed = processVideos(
    data.items,
    excludeShorts,
    min10Minutes
  );
  onStep?.("🧠 AI 프롬프트 생성 중...");
onProgress?.(50);

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

    const thumbnailPrompt =
  createThumbnailPrompt(keyword);

  onStep?.("🤖 AI 리포트를 생성하는 중...");
onProgress?.(75);

  const ai =
    await generateAllAI({
language,
      reportPrompt: prompt,

      ideaPrompt,

      strategyPrompt,

      competitionPrompt,

      titlePrompt,

      thumbnailPrompt,

      recommendedChannelsPrompt,

      opportunityPrompt,

    });

  onStep?.("📄 Benchmark Dashboard를 생성하는 중...");
onProgress?.(100);

  return {

    processed,

    ai,

  };
}