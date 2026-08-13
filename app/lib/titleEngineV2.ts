import { Video } from "./types";
import { analyzeTitle } from "./titleAnalyzer";

export type TitleEngineResult = {
  score: number;
  seo: number;
  emotion: number;
  ctr: number;
  keyword: number;
  length: number;
};

export function calculateTitleEngineV2(
  videos: Video[]
): TitleEngineResult {
  if (!videos.length) {
    return {
      score: 0,
      seo: 0,
      emotion: 0,
      ctr: 0,
      keyword: 0,
      length: 0,
    };
  }

  const analyses = videos.map((video) =>
    analyzeTitle(video.snippet.title)
  );

  const average = (values: number[]) =>
    values.reduce((a, b) => a + b, 0) /
    values.length;

  const seo = Math.round(
    average(analyses.map((a) => a.seo))
  );

  const emotion = Math.round(
    average(analyses.map((a) => a.emotion))
  );

  const ctr = Math.round(
    average(analyses.map((a) => a.ctr))
  );

  const keyword = Math.round(
    average(analyses.map((a) => a.keyword))
  );

  const length = Math.round(
    average(analyses.map((a) => a.length))
  );

  const score = Math.round(
    (seo + emotion + ctr + keyword + length) / 50
  );

  return {
    score,
    seo,
    emotion,
    ctr,
    keyword,
    length,
  };
}