import { Video } from "./types";

export function calculateTrendMomentum(
  videos: Video[]
) {
  if (!videos.length) {
    return {
      momentum: 0,
      growthRate: 0,
      acceleration: 0,
      lifecycle: "Unknown",
      peakTiming: "Unknown",
    };
  }

  const now = Date.now();

  const ages = videos.map((video) => {
    const published = new Date(
      video.snippet.publishedAt
    ).getTime();

    return Math.max(
      1,
      (now - published) /
        (1000 * 60 * 60 * 24)
    );
  });

  const totalViews = videos.reduce(
    (sum, video) =>
      sum +
      Number(video.statistics?.viewCount ?? 0),
    0
  );

  const averageViews =
    totalViews / videos.length;

  const averageAge =
    ages.reduce((a, b) => a + b, 0) /
    ages.length;

  const velocity =
    averageViews / averageAge;

  const momentum = Math.min(
    100,
    Math.round(velocity / 5000)
  );

  const growthRate = Math.min(
    100,
    Math.round(momentum * 0.8)
  );

  const acceleration = Math.min(
    100,
    Math.round(momentum * 0.6)
  );

  let lifecycle = "Late";

  if (momentum >= 75)
    lifecycle = "Early";

  else if (momentum >= 45)
    lifecycle = "Growing";

  const peakTiming =
    momentum >= 80
      ? "Now"
      : momentum >= 60
      ? "Soon"
      : "Later";

  return {
    momentum,
    growthRate,
    acceleration,
    lifecycle,
    peakTiming,
  };
}