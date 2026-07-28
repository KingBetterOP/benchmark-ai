import { Video } from "./types";

export type Prediction = {
  expectedViews: number;
  difficulty: number;
  trend: "Rising" | "Stable" | "Falling";
  confidence: number;
  reasons: string[];
};

export function calculatePrediction(
  videos: Video[]
): Prediction {

  if (videos.length === 0) {
   return {
  expectedViews: 0,
  difficulty: 0,
  trend: "Stable",
  confidence: 0,
  reasons: [],
};
  }

  const views = videos.map(v =>
    Number(v.statistics?.viewCount ?? 0)
  );

  const average =
    views.reduce((a, b) => a + b, 0) / views.length;

  const recentVideos = videos.filter(video => {
    const days =
      (Date.now() -
        new Date(video.snippet.publishedAt).getTime()) /
      (1000 * 60 * 60 * 24);

    return days <= 30;
  }).length;

  const freshness = recentVideos / videos.length;

  const expectedViews = Math.round(average * 0.85);

  const difficulty =
    Math.max(
      5,
      Math.min(
        95,
        100 - freshness * 40 - average / 100000
      )
    );

  const confidence =
    Math.round(
      60 +
        freshness * 25 +
        Math.min(videos.length / 2, 15)
    );

  const trend =
    freshness > 0.5
      ? "Rising"
      : freshness > 0.2
      ? "Stable"
      : "Falling";

const reasons: string[] = [];

if (freshness > 0.5) {
  reasons.push("📈 Recent videos are actively being uploaded.");
} else {
  reasons.push("📉 Few recent uploads were found.");
}

if (difficulty <= 30) {
  reasons.push("🟢 Competition is relatively low.");
} else if (difficulty <= 60) {
  reasons.push("🟡 Competition is moderate.");
} else {
  reasons.push("🔴 Competition is high.");
}

if (average > 300000) {
  reasons.push("🔥 High average view count.");
} else {
  reasons.push("👀 Moderate average view count.");
}
  return {
  expectedViews,
  difficulty,
  trend,
  confidence,
  reasons,
};
}