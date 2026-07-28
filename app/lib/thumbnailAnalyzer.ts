import { Video } from "./types";

export function analyzeThumbnail(video: Video) {
  const title = video.snippet.title.toLowerCase();

  let face = 60;
  let contrast = 70;
  let text = 75;
  let click = 70;

  if (title.includes("how")) {
    click += 10;
    text += 5;
  }

  if (title.includes("vs")) {
    click += 12;
  }

  if (title.includes("challenge")) {
    click += 15;
  }

  if (title.includes("mrbeast")) {
    face += 20;
    click += 10;
  }

  face = Math.min(face, 100);
  contrast = Math.min(contrast, 100);
  text = Math.min(text, 100);
  click = Math.min(click, 100);

  return {
    face,
    contrast,
    text,
    click,
  };
}