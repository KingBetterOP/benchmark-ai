import { Video } from "./types";
import { analyzeThumbnail } from "./thumbnailAnalyzer";

export type ThumbnailEngineResult = {
  score: number;
  face: number;
  contrast: number;
  text: number;
  click: number;
};

export function calculateThumbnailEngineV2(
  videos: Video[]
): ThumbnailEngineResult {
  if (!videos.length) {
    return {
      score: 0,
      face: 0,
      contrast: 0,
      text: 0,
      click: 0,
    };
  }

  const analyses = videos.map(analyzeThumbnail);

  const average = (
    values: number[]
  ) =>
    values.reduce((a, b) => a + b, 0) /
    values.length;

  const face = Math.round(
    average(analyses.map((a) => a.face))
  );

  const contrast = Math.round(
    average(analyses.map((a) => a.contrast))
  );

  const text = Math.round(
    average(analyses.map((a) => a.text))
  );

  const click = Math.round(
    average(analyses.map((a) => a.click))
  );

  const score = Math.round(
    (face + contrast + text + click) / 40
  );

  return {
    score,
    face,
    contrast,
    text,
    click,
  };
}